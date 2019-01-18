<?php

defined('BASEPATH') OR exit('No direct script access allowed');
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
class Posts extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }
    
    public function moreforsale() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('post_id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }

        $id = $this->input->post('post_id');
        $result = $this->AdminModel->getMoreForSalePost($id);
        $count = $result['count'];
        $total = $result['total'];
        $result['more'] = ($count < $total) ? true : false;
        $result['success'] = true;
        echo json_encode($result);
        exit;
    }

    public function forsale() {
        $result = $this->AdminModel->getForsalePosts();
        $data = array(
            'view' => 'admin/posts/forsale',
            'result' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function mostviewed() {
        $result = $this->AdminModel->getMostViewedPosts();
        $data = array(
            'view' => 'admin/posts/mostviewed',
            'result' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function top() {
        $result = $this->AdminModel->getTopPosts();
        $data = array(
            'view' => 'admin/posts/top',
            'result' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function index() {
        $result = $this->AdminModel->getPosts();
        $data = array(
            'view' => 'admin/posts/index',
            'result' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function addtop() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }

        $id = $this->input->post('id');
        $sql = "UPDATE posts SET is_top = !is_top WHERE id = ?";
        $this->db->query($sql, array($id));
        $response['success'] = true;
        echo json_encode($response);
        exit;
    }

    public function more() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('post_id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }

        $id = $this->input->post('post_id');
        $result = $this->AdminModel->getMorePost($id);
        $count = $result['count'];
        $total = $result['total'];
        $result['more'] = ($count < $total) ? true : false;
        $result['success'] = true;
        echo json_encode($result);
        exit;
    }

    public function block() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }

        $id = $this->input->post('id');
        try {
            $this->db->update('users', array('active' => "0"), array('id' => $id));
            $response['msg'] = "User has been blocked!";
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
        echo json_encode($response);
        exit;
    }

    public function delete() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }

        $id = $this->input->post('id');
        $user_id = $this->AdminModel->getUserByPostId($id);
        $this->db->delete('posts', array('id' => $id));

        $created = date('Y-m-d H:i:s');
        $fields = array(
            'post_id' => $id,
            'created' => $created
        );
        $this->db->insert('deleted', $fields);
        if ($user_id) {
            $this->PushModel->sendOneSignal(MSG_POST_DELETED, array($user_id));
        }
        $response['msg'] = MSG_POST_DELETED;
        $response['success'] = true;
        echo json_encode($response);
        exit;
    }

    public function view() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $get = array(
            'id' => $this->input->get('id')
        );
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->get('id');
        $postinfo = $this->AdminModel->getPost($id);
        if (!$postinfo) {
            $response['msg'] = "Post not found";
            echo json_encode($response);
            exit;
        }

        $type = $postinfo->type;
        $html = '<div class="thumbnail">';
        if ($type === 'image' || $type === 'gif') {
            $html .= '<div><img src="' . $postinfo->img . '" alt="" style="width:100%"></div>';
        }
        if ($type === 'video') {
            $html .= '<div>';
            $html .= '<video id="video" class="rounded-top" poster="' . $postinfo->thumb . '" controls crossorigin>';
            $html .= '<source src="' . $postinfo->vid . '" type="video/mp4">';
            $html .= '<a href="' . $postinfo->vid . '" download>Download</a>';
            $html .= '</video>';
            $html .= '</div>';
        }
        if ($type === 'pdf') {
            $html .= '<div><a href="' . $postinfo->pdf . '" target="_blank"><i class="fa fa-download"></i> Download PDF</a></div>';
        }
        $html .= '<div class="caption">';
        $html .= '<h5>';
        $html .= '<div class="float-right"><small><i class="fa fa-clock-o"></i> '.$postinfo->fulldate.'</small></div>';
        $html .= $postinfo->username;
        $html .= '</h5>';
        if ($postinfo->text) {
            $html .= '<p>' . $postinfo->text . '</p>';
        }
        if ($postinfo->is_forsale) {
            $html .= '<p>' . $postinfo->title . '</p>';
            $html .= '<p>' . $postinfo->description . '</p>';
            $html .= '<p>' . $postinfo->price . '</p>';
        }
        $html .= '<div class="thumbnail-extra">
                        <ul class="list-inline">
                          <li><a class="text-muted"><i class="fa fa-eye"></i> ' . $postinfo->views . '</a></li>
                          <li><a class="text-muted"><i class="fa fa-heart"></i> ' . $postinfo->likes . '</a></li>
                          <li><a class="text-muted"><i class="fa fa-heartbeat"></i> ' . $postinfo->dislikes . '</a></li>
                          <li><a class="text-muted"><i class="fa fa-comments"></i> ' . $postinfo->comments . '</a></li>
                          <li><a class="text-muted"><i class="fa fa-list-alt"></i> ' . $postinfo->reports . '</a></li>
                          <li><a class="text-muted"><i class="fa fa-download"></i> ' . $postinfo->downloads . '</a></li>
                        </ul>
                      </div>';
        $html .= '</div>';

        $html .= '</div>';

        $response['success'] = true;
        $response['content'] = $html;
        $response['timestamp'] = $postinfo->created_ts;

        echo json_encode($response);
        exit;
    }

}
