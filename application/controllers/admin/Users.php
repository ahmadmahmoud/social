<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Users
 *
 * @author pslpt189
 */
class Users extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }
    
    public function index() {
        $result = $this->AdminModel->getUsers();
        $data = array(
            'view' => 'admin/users/index',
            'users' => $result
        );
        $this->load->view('layouts/admin', $data);
    }
    
    public function view($id) {
        if(!filter_var($id, FILTER_VALIDATE_INT)){
            redirect($this->config->item('admin_url'), '301');
        }
        $user = $this->AdminModel->getUser($id);
        if(!$user){
            redirect($this->config->item('admin_url'), '301');
        }
        $links = $this->AdminModel->getUserSocialLinks($id);
        $data = array(
            'view' => 'admin/users/view',
            'user' => $user,
            'links' => $links
        );
        $this->load->view('layouts/admin', $data);
    }
    
    public function activate() {
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
            $this->db->update('users', array('active' => "1",'deleted' => "0"), array('id' => $id));
            $response['msg'] = "User has been activated!";
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
        echo json_encode($response);
        exit;
    }
    
    public function deactivateuser() {
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
        $created = date('Y-m-d H:i:s');
        try {
            $this->db->update('users', array('active' => "0",'deleted' => "1",'deleted_date' => $created), array('id' => $id));
            $response['msg'] = "User has been blocked!";
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
        echo json_encode($response);
        exit;
    }

}
