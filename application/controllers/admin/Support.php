<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Support
 *
 * @author Ahmad Mahmoud
 */
class Support extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getSupport();
        $data = array(
            'view' => 'admin/support',
            'result' => $result
        );
        $this->load->view('layouts/admin', $data);
    }
    
    public function answer() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('answer', 'Answer', 'trim|required|integer|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('id');
        $answer = $this->input->post('answer');
        $answer = ($answer) ? 0 : 1;
        try {
            $this->db->update('contactus', array('answered' => $answer), array('id' => $id));
            $response['answer'] = strval($answer);
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
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
        $supportinfo = $this->AdminModel->getSupportId($id);
        if (!$supportinfo) {
            $response['msg'] = "Support not found";
            echo json_encode($response);
            exit;
        }
        
        $this->db->update('contactus', array('seen'=>1), array('id'=>$id));

        $response['success'] = true;
        $response['title'] = $supportinfo->title;
        $response['body'] = $supportinfo->message;
        $response['timestamp'] = $supportinfo->created_ts;

        echo json_encode($response);
        exit;
    }

}
