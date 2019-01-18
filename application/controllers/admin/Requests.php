<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Admobs
 *
 * @author Ahmad Mahmoud
 */
class Requests extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getRequests();
        $data = array(
            'view' => 'admin/requests',
            'requests' => $result
        );
        $this->load->view('layouts/admin', $data);
    }
    
    public function approve() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('request_id', 'request_id', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('request_id');
        $user = $this->AdminModel->getRequestUser($id);
        if(!$user){
            $response['msg'] = "User not found";
            echo json_encode($response);
            exit;
        }
        $user_id = $user->user_id;
        $newusername = $user->newusername;
        
        if (!preg_match('/^\w{2,}$/', $newusername)) {
            $this->failed(MSG_USERNAME_INVALID);
        }

        $sql = "SELECT id FROM users WHERE username = ? AND id <> ? AND active = 1";
        $query = $this->db->query($sql, array($newusername, $user_id));
        $result = $query->row();
        if ($result) {
            $this->failed(MSG_USERNAME_TAKEN);
        }
        
        $this->db->delete('requests', array('id' => $id));
        $this->db->update('users', array('username' => $newusername), array('id' => $user_id));
        
        $message =  MSG_CHANGEUSERNAME_APPROVE;
        $created = date('Y-m-d H:i:s');
        $this->db->insert('notifications', array(
            'user_id' => '',
            'user_name' => '',
            'post_id' => '',
            'notified_id' => $user_id,
            'message' => $message,
            'action' => 8,
            'is_admin' => 1,
            'seen' => 0,
            'created' => $created
        ));
        
        $response['msg'] = $message;
        $this->PushModel->sendOneSignal($message, array($user_id));
        $response['success'] = TRUE;
        echo json_encode($response);
        exit;
    }
    
    public function reject() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('request_id', 'request_id', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('request_id');
        $user = $this->AdminModel->getRequestUser($id);
        if(!$user){
            $response['msg'] = "User not found";
            echo json_encode($response);
            exit;
        }
        $user_id = $user->user_id;
        $this->db->delete('requests', array('id' => $id));
        $message =  MSG_CHANGEUSERNAME_REJECT;
        $created = date('Y-m-d H:i:s');
        $this->db->insert('notifications', array(
            'user_id' => '',
            'user_name' => '',
            'post_id' => '',
            'notified_id' => $user_id,
            'message' => $message,
            'action' => 9,
            'is_admin' => 1,
            'seen' => 0,
            'created' => $created
        ));
        
        $response['msg'] = $message;
        $this->PushModel->sendOneSignal($message, array($user_id));
        $response['success'] = TRUE;
        echo json_encode($response);
        exit;
    }

    public function update() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('admobs_id', 'Android', 'trim|required|integer|min_length[1]');
        //$this->form_validation->set_rules('admobs_android', 'Android', 'trim|required|min_length[1]');
        //$this->form_validation->set_rules('admobs_ios', 'iOS', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('admobs_allposts', 'admobs_allposts', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_mostviewed', 'admobs_mostviewed', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_messages', 'admobs_messages', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_chat', 'admobs_chat', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_notifications', 'admobs_notifications', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_profile', 'admobs_profile', 'trim|required|integer|min_length[1]');
        $this->form_validation->set_rules('admobs_settings', 'admobs_settings', 'trim|required|integer|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('admobs_id');
        //$admobs_android = $this->input->post('admobs_android');
        //$admobs_ios = $this->input->post('admobs_ios');
        $admobs_allposts = $this->input->post('admobs_allposts');
        $admobs_mostviewed = $this->input->post('admobs_mostviewed');
        $admobs_messages = $this->input->post('admobs_messages');
        $admobs_chat = $this->input->post('admobs_chat');
        $admobs_notifications = $this->input->post('admobs_notifications');
        $admobs_profile = $this->input->post('admobs_profile');
        $admobs_settings = $this->input->post('admobs_settings');

        $row = $this->AdminModel->getAdmobs();
        $fields = array(
            //'android' => $admobs_android,
            //'ios' => $admobs_ios,
            'allposts' => $admobs_allposts,
            'mostviewed' => $admobs_mostviewed,
            'chat' => $admobs_chat,
            'messages' => $admobs_messages,
            'settings' => $admobs_settings,
            'profile' => $admobs_profile,
            'notifications' => $admobs_notifications
        );
        $this->db->insert('admobs', $fields);

        if (!$row) {
            $this->db->insert('admobs', $fields);
        } else {
            $id = $row->id;
            $this->db->update('admobs', $fields, array('id' => $id));
        }
        $response['success'] = TRUE;
        echo json_encode($response);
        exit;
    }

}
