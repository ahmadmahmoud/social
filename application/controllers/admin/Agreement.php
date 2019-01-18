<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Settings
 *
 * @author Ahmad Mahmoud
 */
class Agreement extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getAgreement();
        $data = array(
            'view' => 'admin/agreement',
            'result' => $result
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
        $this->form_validation->set_rules('content', 'Content', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Missing parameters or empty content";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('id');
        $content = $this->input->post('content');
        
        $row = $this->AdminModel->getAgreement();
        if (!$row) {
            $created = date('Y-m-d H:i:s');
            $fields = array(
                'title' => "Agreement",
                'content' => $content,
                'active' => "1",
                'created' => $created
            );
            $this->db->insert('agreement', $fields);
        } else {
            $id = $row->id;
            $fields = array(
                'content' => $content
            );
            $this->db->update('agreement', $fields, array('id' => $id));
        }
        $response['success'] = TRUE;
        echo json_encode($response);
        exit;
    }

    public function password() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('newpwd', 'New Password', 'trim|required|min_length[5]');
        $this->form_validation->set_rules('retpwd', 'Confirm Password', 'trim|required|matches[newpwd]');
        if ($this->form_validation->run() == FALSE) {
            $errors = $this->form_validation->error_array();
            if (isset($errors['newpwd'])) {
                $response['msg'] = 'New password is required';
                echo json_encode($response);
                exit;
            }
            if (isset($errors['retpwd'])) {
                $response['msg'] = ERROR_PASSWORDS_DONT_MATCH;
                echo json_encode($response);
                exit;
            }
        }
        $curpwd = $this->input->post('curpwd');
        $newpwd = $this->input->post('retpwd');

        $bcrypt_newpwd = $this->AdminModel->hashPassword($newpwd);
        $admin = $this->session->userdata('admin');
        $id = $admin['id'];

        try {
            $this->db->update('admin', array('password' => $bcrypt_newpwd), "id = $id");
            $response['success'] = TRUE;
            $response['msg'] = "Password Updated";
        } catch (Exception $ex) {
            $response['msg'] = $ex->getMessage();
        }
        echo json_encode($response);
        exit;
    }

}
