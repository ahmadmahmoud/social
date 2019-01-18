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
class Admobs extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getAdmobs();
        $data = array(
            'view' => 'admin/admobs',
            'admobs' => $result
        );
        $this->load->view('layouts/admin', $data);
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
