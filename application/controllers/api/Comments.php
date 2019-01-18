<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Comments
 *
 * @author Ahmad Mahmoud
 */
class Comments extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }
    
    public function index() {
        $get = array(
            'id' => $this->input->get('id'),
            'page' => $this->input->get('page')
        );
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('id', 'Post ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('page', 'Page', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
            if (isset($errors['page'])) {
                $this->failed(MSG_PAGE_REQUIRED);
            }
        }
        $id = $this->input->get('id');
        $page = $this->input->get('page');
        $user_id = $this->user->id;
        $data = $this->PostsModel->getCommentsAll($user_id, $id, $page);
        $count = $data['count'];
        $total = $data['total'];
        $pages = "1";
        if($total >= POST_LIMIT){
            $pages = strval(ceil($total/POST_LIMIT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(POST_LIMIT);
        $meta->count = strval($count);
        $meta->total = $data['total'];
        $meta->pages = $pages;
        $this->success("", $meta, $data['result']);
    }
    
    public function add() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_POSTID_REQUIRED);
            }
        }
        $user_id = $this->user->id;
        $user_name = $this->user->username;
        $id = $this->input->post('id');
        $post_text = $this->input->post('text');
        
        $text = ($post_text && trim($post_text)) ? trim($post_text) : "";
        $is_text = ($text) ? true : false;
        $is_img = $is_gif = false;
        
        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '2048';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);
        
        $img = null;
        if ($this->upload->do_upload('img')) {
            $img = $this->upload->data();
            $file_size = $img['file_size'];
            if($file_size){
                $image_type = $img['image_type'];
                $is_img = true;    
                if($image_type === 'gif'){
                    $is_gif = true;
                }
                $img_name = $img['file_name'];
                rename(UPLOAD_PATH . $img_name, UPLOAD_PATH_COMMENT . $img_name);
            }
        }
        
        if(!$is_text && !$is_img){
            $this->failed(MSG_REQUIRE_POST);
        }
        
        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'post_id' => $id,
            'text' => $text,
            'img' => ($is_img) ? ($img_name) : NULL,
            'is_gif' => ($is_gif) ? 1 : 0,
            'created' => $created
        );
        $this->db->insert('comments', $fields);
        
        $postinfo = $this->PostsModel->getPost($id, $user_id);
        $notified_id = $postinfo->user_id;
        $type = 'post';
        if($postinfo->vid){$type = 'video';}
        if($postinfo->img){$type = 'image';}
        if($postinfo->is_gif){$type = 'gif';}
        $this->NotificationsModel->add($user_id, $user_name, $notified_id, $id, POST_COMMENT, NOTIF_COMMENT, $type);
        
        $this->success(MSG_COMMENT_SUCCESS, array(), array());
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
        
        if(!($comment = $this->PostsModel->getComment($id))){
            $this->failed(MSG_COMMENT_NOTFOUND);
        }
        $post_id = $comment->post_id;
        
        $isCommentOwner = $this->PostsModel->isCommentOwner($user_id, $id);
        $isPostOwner = $this->PostsModel->isPostOwner($user_id, $post_id);
        
        if(!$isCommentOwner && !$isPostOwner){
            $this->failed(MSG_COMMENT_NOTOWNER);
        }
        
        $this->db->delete('comments', array('id' => $id, 'user_id' => $user_id));
        $this->success(MSG_COMMENT_DELETED, array(), array());
    }

}
