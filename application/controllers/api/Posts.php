<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
date_default_timezone_set("UTC");
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Posts
 *
 * @author Ahmad Mahmoud
 */
class Posts extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }

    public function search() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('keyword', 'Keyword', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['keyword'])) {
                $this->failed(MSG_KEYWORD_FAILED);
            }
        }
        $user_id = $this->user->id;
        $keyword = $this->input->post('keyword');

        if (!filter_var($keyword, FILTER_SANITIZE_STRING)) {
            $this->failed(MSG_KEYWORD_FAILED);
        }

        $keyword = str_replace(array("'", '"'), '', $keyword);

        $result = new stdClass();
        $posts = $this->PostsModel->searchPosts($user_id, $keyword);
        $this->PostsModel->setPostView($posts['result']);
        $result->posts = $posts['result'];

        $users = $this->UserModel->searchUsers($keyword);
        $result->users = $users['result'];

        $this->success("", array(), $result);
    }

    public function report() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('cause_id', 'Cause ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
            if (isset($errors['cause_id'])) {
                $this->failed(MSG_CAUSE_REQUIRED);
            }
        }
        $user_id = $this->user->id;
        $id = $this->input->post('id');
        $cause_id = $this->input->post('cause_id');
        
        $sql = "SELECT id FROM reports WHERE user_id = ? AND post_id = ?";
        $query = $this->db->query($sql, array($user_id, $id));
        $row = $query->row();
        if($row){
            $this->failed(MSG_REPORT_EXISTS);
        }

        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'post_id' => $id,
            'cause_id' => $cause_id,
            'created' => $created
        );
        $this->db->insert('reports', $fields);

        $postinfo = $this->PostsModel->getPost($id, $user_id);
        $notified_id = $postinfo->user_id;
        $user_name = $this->user->username;

        $times = $postinfo->reports;
        if ($postinfo->vid) {
            $brief = 'Your video';
        }
        if ($postinfo->img) {
            $brief = 'Your image';
        }
        if ($postinfo->is_gif) {
            $brief = 'Your gif';
        }
        $text = trim($postinfo->text);
        if ($text) {
            $brief = str_replace('"', '', $text);
            $brief = '"' . trim(substr($text, 0, 10)) . '"';
        }

        $this->NotificationsModel->report($user_id, $user_name, $notified_id, $id, $brief, $times);

        $this->success(MSG_POST_REPORT, array(), array('reports' => $times));
    }

    public function download() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;

        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'post_id' => $id,
            'created' => $created
        );

        $postinfo = $this->PostsModel->getPost($id, $user_id);
        if (!$postinfo) {
            $this->failed(MSG_POST_NOTFOUND);
        }
        if ($postinfo->type === 'text') {
            $fields['is_copy'] = 1;
        }

        $this->db->insert('downloads', $fields);
        if ($postinfo->type === 'text') {
            $this->db->query("UPDATE profile SET `copy` = `copy` + 1 WHERE user_id = {$user_id}");
            $this->db->query("UPDATE posts SET `copy` = `copy` + 1 WHERE id = {$id}");
            $downloads = $postinfo->copy + 1;
            $post_type = POST_COPY;
            $post_notify = NOTIF_COPY;
        } else {
            $this->db->query("UPDATE profile SET downloads = downloads + 1 WHERE user_id = {$user_id}");
            $this->db->query("UPDATE posts SET downloads = downloads + 1 WHERE id = {$id}");
            $downloads = $postinfo->downloads + 1;
            $post_type = POST_DOWNLOAD;
            $post_notify = NOTIF_DOWNLOAD;
        }

        $notified_id = $postinfo->user_id;
        $user_name = $this->user->username;
        $type = 'post';
        if ($postinfo->vid) {
            $type = 'video';
        }
        if ($postinfo->img) {
            $type = 'image';
        }
        if ($postinfo->is_gif) {
            $type = 'gif';
        }
        $this->NotificationsModel->add($user_id, $user_name, $notified_id, $id, $post_type, $post_notify, $type);

        $this->success("", array(), array('downloads' => strval($downloads)));
    }

    public function like() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;

        if (($postInfo = $this->PostsModel->getDetails($id)) == FALSE) {
            $this->failed(MSG_POST_NOTFOUND);
        }

        $owner_id = $postInfo->user_id;
        $likes_list = $postInfo->likes_list;
        $dislikes_list = $postInfo->dislikes_list;
        $doNotify = false;

        $result = $this->PostsModel->getLikeDislikes($user_id, $id);
        $ilike = $result->ilike;
        $idislike = $result->idislike;
        $iLikePost = "0";

        if ($ilike) {
            $this->db->delete('likes', array('user_id' => $user_id, 'post_id' => $id));
        } else {
            $created = date('Y-m-d H:i:s');
            $fields = array(
                'user_id' => $user_id,
                'post_id' => $id,
                'created' => $created
            );
            $this->db->insert('likes', $fields);
            $newLikeID = $this->db->insert_id();
            if ($newLikeID) {
                if ($owner_id != $user_id) {
                    $doNotify = true;
                }
                if ($likes_list) {
                    $arr = array_unique(explode(",", $likes_list));
                    if (in_array($user_id, $arr)) {
                        $doNotify = false;
                    } else {
                        $arr[] = $user_id;
                    }
                    $likes_list = implode(",", $arr);
                } else {
                    $arr = array();
                    $arr[] = $user_id;
                    $likes_list = implode(",", $arr);
                }
                $iLikePost = "1";
            }
        }

        if ($idislike) {
            $this->db->delete('dislikes', array('user_id' => $user_id, 'post_id' => $id));
        }

        $this->PostsModel->updateList($id, $user_id, $likes_list, $dislikes_list);
        $postdata = $this->PostsModel->getPost($id, $user_id);

        $data = array(
            'likes' => $postdata->likes,
            'dislikes' => $postdata->dislikes,
            'ilike_post' => $iLikePost,
            'idislike_post' => "0"
        );

        $notified_id = $postdata->user_id;
        $user_name = $this->user->username;
        $type = 'post';
        if ($postdata->vid) {
            $type = 'video';
        }
        if ($postdata->img) {
            $type = 'image';
        }
        if ($postdata->is_gif) {
            $type = 'gif';
        }

        if ($doNotify) {
            $this->NotificationsModel->add($user_id, $user_name, $notified_id, $id, POST_LIKE, NOTIF_LIKE, $type);
        }

        $this->success(MSG_POST_LIKE, array(), $data);
    }

    public function dislike() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;
        if (($postInfo = $this->PostsModel->getDetails($id)) == FALSE) {
            $this->failed(MSG_POST_NOTFOUND);
        }
        $owner_id = $postInfo->user_id;
        $likes_list = $postInfo->likes_list;
        $dislikes_list = $postInfo->dislikes_list;
        $doNotify = false;

        $result = $this->PostsModel->getLikeDislikes($user_id, $id);
        $ilike = $result->ilike;
        $idislike = $result->idislike;
        $iDislikePost = "0";

        if ($idislike) {
            $this->db->delete('dislikes', array('user_id' => $user_id, 'post_id' => $id));
        } else {
            $created = date('Y-m-d H:i:s');
            $fields = array(
                'user_id' => $user_id,
                'post_id' => $id,
                'created' => $created
            );
            $this->db->insert('dislikes', $fields);
            $newDislikeID = $this->db->insert_id();
            if ($newDislikeID) {
                if ($owner_id != $user_id) {
                    $doNotify = true;
                }
                if ($dislikes_list) {
                    $arr = array_unique(explode(",", $dislikes_list));
                    if (in_array($user_id, $arr)) {
                        $doNotify = false;
                    } else {
                        $arr[] = $user_id;
                    }
                    $dislikes_list = implode(",", $arr);
                } else {
                    $arr = array();
                    $arr[] = $user_id;
                    $dislikes_list = implode(",", $arr);
                }
                $iDislikePost = "1";
            }
        }

        if ($ilike) {
            $this->db->delete('likes', array('user_id' => $user_id, 'post_id' => $id));
        }
        $this->PostsModel->updateList($id, $user_id, $likes_list, $dislikes_list);
        $postdata = $this->PostsModel->getPost($id, $user_id);
        $data = array(
            'likes' => $postdata->likes,
            'dislikes' => $postdata->dislikes,
            'ilike_post' => "0",
            'idislike_post' => $iDislikePost
        );

        $notified_id = $postdata->user_id;
        $user_name = $this->user->username;
        $type = 'post';
        if ($postdata->vid) {
            $type = 'video';
        }
        if ($postdata->img) {
            $type = 'image';
        }
        if ($postdata->is_gif) {
            $type = 'gif';
        }

        if ($doNotify) {
            $this->NotificationsModel->add($user_id, $user_name, $notified_id, $id, POST_DISLIKE, NOTIF_DISLIKE, $type);
        }

        $this->success(MSG_POST_DISLIKE, array(), $data);
    }

    public function view() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;

        $row = $this->PostsModel->getPost($id, $user_id);
        if (!$row) {
            $this->failed(MSG_POST_NOTFOUND);
        }

        $this->db->trans_start();
        $this->db->query("UPDATE profile SET views = views + 1 WHERE user_id = {$user_id}");
        $this->db->query("UPDATE posts SET views = views + 1 WHERE id = {$id}");
        $this->db->query("UPDATE notifications SET seen = 1 WHERE notified_id = {$user_id} AND post_id = {$id}");
        $this->db->trans_complete();

        $views = $row->views + 1;
        $views = strval($views);
        $row->views = $views;

        $this->success("", array(), array($row));
    }

    public function mostViewed() {
        $get = array('page' => $this->input->get('page'));
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('page', 'Page', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['page'])) {
                $this->failed(MSG_PAGE_REQUIRED);
            }
        }
        $page = $this->input->get('page');
        $user_id = $this->user->id;
        $device = $this->user->device;
        if ($device) {
            $os = $device->os;
        } else {
            $os = 'android';
        }
        $banners = $this->CommonModel->getBanners($os);
        $admobs = $this->CommonModel->getAdMob($device, 'mostviewed');
        $admob = (isset($admobs) && $admobs->admob) ? $admobs->admob : "";
        
        $admobs_reward = $this->CommonModel->getRewardedAdMob($device, 'mostviewed');
        $admob_reward = (isset($admobs_reward) && $admobs_reward->admob) ? $admobs_reward->admob : "";

        $data = $this->PostsModel->getPostsMostViewed($user_id, $page);
        $this->PostsModel->setPostView($data['result']);

        $result = new stdClass();
        $result->posts = $data['result'];
        $result->banners = $banners;
        $result->admob = $admob;
        $result->admob_reward = $admob_reward;

        $count = $data['count'];
        $total = $data['total'];
        $pages = "1";
        if ($total >= POST_LIMIT) {
            $pages = strval(ceil($total / POST_LIMIT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(POST_LIMIT);
        $meta->count = strval($count);
        $meta->total = strval($data['total']);
        $meta->pages = $pages;

        $this->success("", $meta, $result);
    }

    public function all() {
        $get = array('page' => $this->input->get('page'));
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('page', 'Page', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['page'])) {
                $this->failed(MSG_PAGE_REQUIRED);
            }
        }
        $page = $this->input->get('page');
        $user_id = $this->user->id;
        $device = $this->user->device;
        if ($device) {
            $os = $device->os;
        } else {
            $os = 'android';
        }
        $banners = $this->CommonModel->getBanners($os);
        $admobs = $this->CommonModel->getAdMob($device, 'allposts');
        $admob = (isset($admobs) && $admobs->admob) ? $admobs->admob : "";
        
        $admobs_reward = $this->CommonModel->getRewardedAdMob($device, 'allposts');
        $admob_reward = (isset($admobs_reward) && $admobs_reward->admob) ? $admobs_reward->admob : "";

        $data = $this->PostsModel->getPostsAll($user_id, $page);
        $this->PostsModel->setPostView($data['result']);

        $result = new stdClass();
        $result->posts = $data['result'];
        $result->banners = $banners;
        $result->admob = $admob;
        $result->admob_reward = $admob_reward;

        $count = $data['count'];
        $total = $data['total'];
        $pages = "1";
        if ($total >= POST_LIMIT) {
            $pages = strval(ceil($total / POST_LIMIT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(POST_LIMIT);
        $meta->count = strval($count);
        $meta->total = strval($data['total']);
        $meta->pages = $pages;

        $this->success("", $meta, $result);
    }

    public function add() {
        $user_id = $this->user->id;
        $text = $this->input->post('text');
        $vid_desc = $this->input->post('vid_desc');
        $img_desc = $this->input->post('img_desc');

        $text = ($text && trim($text)) ? trim($text) : "";
        if (mb_strlen($text) > POST_TEXT_LEN) {
            $text = mb_substr($text, 0, POST_TEXT_LEN);
        }

        $img_desc = ($img_desc && trim($img_desc)) ? trim($img_desc) : "";
        if (strlen($img_desc) > POST_TEXT_LEN) {
            $img_desc = substr($img_desc, 0, POST_TEXT_LEN);
        }
        $vid_desc = ($vid_desc && trim($vid_desc)) ? trim($vid_desc) : "";
        if (strlen($vid_desc) > POST_TEXT_LEN) {
            $vid_desc = substr($vid_desc, 0, POST_TEXT_LEN);
        }

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg|mp4|pdf';
        $config['max_size'] = '3072';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $is_text = ($text) ? $text : false;
        $is_img = $is_gif = $is_vid = $is_pdf = false;
        $orig_name = "";

        $img = null;
        if ($this->upload->do_upload('img')) {
            $img = $this->upload->data();
            $file_size = $img['file_size'];
            if ($file_size) {
                $image_type = $img['image_type'];
                $is_img = true;
                if ($image_type === 'gif') {
                    $is_gif = true;
                }
                if ($is_img || $is_gif) {
                    $img_name = $img['file_name'];
                    rename(UPLOAD_PATH . $img_name, UPLOAD_PATH_IMG . $img_name);
                    $orig_name = $img['orig_name'];
                }
            }
        }

        $vid = null;
        if ($this->upload->do_upload('vid')) {
            $vid = $this->upload->data();
            $file_size = $vid['file_size'];
            if ($file_size) {
                $file_type = $vid['file_type'];
                if ($file_type === 'video/mp4') {
                    $is_vid = true;
                    $vid_name = $vid['file_name'];
                    rename(UPLOAD_PATH . $vid_name, UPLOAD_PATH_VID . $vid_name);
                    $orig_name = $vid['orig_name'];

                    $thumb_name = 'video-placeholder.png';
                    if ($this->upload->do_upload('thumb')) {
                        $thumb = $this->upload->data();
                        $thumb_size = $thumb['file_size'];
                        if ($thumb_size) {
                            $thumb_name = $thumb['file_name'];
                            rename(UPLOAD_PATH . $thumb_name, UPLOAD_PATH_THUMBS . $thumb_name);
                        }
                    }
                }
            }
        }

        $pdf = null;
        if ($this->upload->do_upload('pdf')) {
            $pdf = $this->upload->data();
            $file_size = $pdf['file_size'];
            if ($file_size) {
                $file_type = $pdf['file_type'];
                if ($file_type === 'application/pdf') {
                    $is_pdf = true;
                    $pdf_name = $pdf['file_name'];
                    rename(UPLOAD_PATH . $pdf_name, UPLOAD_PATH_PDF . $pdf_name);
                    $orig_name = $pdf['orig_name'];
                }
            }
        }

        $is_media = ($is_img || $is_vid || $is_pdf) ? true : false;

        if (!$is_text && !$is_media) {
            $this->failed(MSG_REQUIRE_POST);
        }

        $type = 'text';
        if ($is_vid) {
            $type = 'video';
        } elseif ($is_pdf) {
            $type = 'pdf';
        } elseif ($is_gif) {
            $type = 'gif';
        } elseif ($is_img) {
            $type = 'image';
        }

        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'text' => $text,
            'vid' => ($is_vid) ? ($vid_name) : "",
            'thumb' => ($is_vid) ? ($thumb_name) : "",
            'img' => ($is_img) ? ($img_name) : "",
            'pdf' => ($is_pdf) ? ($pdf_name) : "",
            'filename' => $orig_name,
            'is_gif' => ($is_gif) ? 1 : 0,
            'type' => $type,
            'vid_desc' => $vid_desc,
            'img_desc' => $img_desc,
            'created' => $created
        );
        //$this->db->trans_start();
        $this->db->insert('posts', $fields);

        $sql = "SELECT maxpostcount FROM `settings` LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        $maxpostcount = $result->maxpostcount;

        $sql = "SELECT COUNT(id) as total FROM `posts`";
        $query = $this->db->query($sql);
        $result = $query->row();
        $total = $result->total;

        if ($total > $maxpostcount) {
            $sql = "SELECT MIN(id) as minid FROM `posts`";
            $query = $this->db->query($sql);
            $result = $query->row();
            $minid = $result->minid;
            $this->db->query("DELETE FROM posts WHERE id = {$minid}");
        }


        //$this->db->query("UPDATE profile SET posts = posts + 1 WHERE user_id = {$user_id}");
        //$this->db->trans_complete();
        $this->success(MSG_POST_SUCCESS, array(), array());
    }

    public function delete() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;

        if (!$this->PostsModel->isPostOwner($user_id, $id)) {
            $this->failed(MSG_POST_NOTOWNER);
        }

        $this->db->delete('posts', array('id' => $id, 'user_id' => $user_id));
        $this->success(MSG_POST_DELETED, array(), array());
    }

}
