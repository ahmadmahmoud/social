<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Reports
 *
 * @author pslpt189
 */
class Reports extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }
    
    public function index() {
        $result = $this->AdminModel->getReports();
        $data = array(
            'view' => 'admin/reports',
            'reports' => $result
        );
        $this->load->view('layouts/admin', $data);
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
        try {
            $this->db->delete('reports', array('id' => $id));
            $response['msg'] = "Report has been deleted!";
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
        echo json_encode($response);
        exit;
    }

}
