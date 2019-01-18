<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Messages
 *
 * @author pslpt189
 */
class Messages extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }
    
    public function open() {
        $get = array('receiver_id' => $this->input->get('receiver_id'));
        $this->form_validation->set_data($get);
        $this->form_validation->set_rules('receiver_id', 'Receiver ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['receiver_id'])) {
                $this->failed(MSG_RECEIVERID_REQUIRED);
            }
        }
        $receiver_id = $this->input->get('receiver_id');
        $page = $this->input->get('page');
        if(!$page){
            $page = 1;
        }else{
            if(!filter_var($page,FILTER_VALIDATE_INT)){
                $page = 1;
            }
        }
        $user_id = $this->user->id;
        
        if (!$this->MessagesModel->validateUser($receiver_id)) {
            $this->failed(MSG_RECEIVERID_REQUIRED);
        }
        
        $conversation_id = $this->MessagesModel->getConversation($user_id, $receiver_id);
        $result = $this->MessagesModel->getMessages($conversation_id, $receiver_id, $page);
        $this->MessagesModel->updateUnreadMessages($conversation_id);
        
        $user = $result['user'];
        $messages = $result['messages'];
        $count = $result['count'];
        $total = $result['total'];
        
        $pages = "1";
        if($total >= LIMIT_RESULT){
            $pages = strval(ceil($total/LIMIT_RESULT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(LIMIT_RESULT);
        $meta->count = strval($count);
        $meta->total = strval($total);
        $meta->pages = $pages;
        
        $device = $this->user->device;
        $admob = $this->CommonModel->getAdMob($device, 'chat');
        $output = array(
            'user' => $user,
            'messages' => $messages,
            'admob' => (isset($admob) && $admob->admob) ? $admob->admob : ""
        );
        $this->success("", $meta, $output); 
    }
    
    public function index() {
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
        
        $data = $this->MessagesModel->getConversations($user_id, $page);
        $count = $data['count'];
        $total = $data['total'];
        $pages = "1";
        if($total >= CONVERSATIONS_LIMIT){
            $pages = strval(ceil($total/CONVERSATIONS_LIMIT));
        }
        $meta = new stdClass();
        $meta->page = $page;
        $meta->limit = strval(CONVERSATIONS_LIMIT);
        $meta->count = strval($count);
        $meta->total = strval($data['total']);
        $meta->pages = $pages;
        $device = $this->user->device;
        $admob = $this->CommonModel->getAdMob($device, 'messages');
        $output = array(
            'messages' => $data['result'],
            'admob' => (isset($admob) && $admob->admob) ? $admob->admob : ""
        );
        $this->success("", $meta, $output); 
    }
    
    public function delete() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['id'])) {
                $this->failed(MSG_RECEIVERID_REQUIRED);
            }
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;
        
        if (!$this->MessagesModel->validateConversation($user_id, $id)) {
            $this->failed(MSG_CONVERSATION_NOTFOUND);
        }
        
        $this->db->delete('conversations', array('id' => $id));
        $this->success(MSG_CONVERSATION_DELETED, array(), array());
    }

    public function add() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('receiver_id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['receiver_id'])) {
                $this->failed(MSG_RECEIVERID_REQUIRED);
            }
        }
        $receiver_id = $this->input->post('receiver_id');
        $sender_id = $this->user->id;
        if($receiver_id == $sender_id){
            $this->failed(MSG_USERID_DUPLICATE);
        }

        if (!$this->MessagesModel->validateUser($receiver_id)) {
            $this->failed(MSG_RECEIVERID_REQUIRED);
        }

        $conversation_id = $this->MessagesModel->getConversation($sender_id, $receiver_id);

        $message = $this->input->post('message');
        $message = ($message && trim($message)) ? trim($message) : "";

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '2048';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $is_message = ($message) ? true : false;
        $is_image = false;

        $img = null;
        if ($this->upload->do_upload('image')) {
            $img = $this->upload->data();
            $file_size = $img['file_size'];
            if ($file_size) {
                $is_image = true;
                $img_name = $img['file_name'];
                rename(UPLOAD_PATH . $img_name, UPLOAD_PATH_MSG . $img_name);
            }
        }
        
        if(!$is_message && !$is_image){
            $this->failed(MSG_REQUIRE_POST);
        }
        
        $fields = array(
            'conversation_id' => $conversation_id,
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'message' => $message,
            'image' => ($is_image) ? ($img_name) : "",
            'seen' => 0,
            'created' => date('Y-m-d H:i:s')
        );
        $this->db->insert('messages', $fields);
        $this->success(MSG_MESSAGES_SUCCESS, array(), array());
    }

}
