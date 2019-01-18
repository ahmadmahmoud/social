<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Welcome
 *
 * @author pslpt189
 */
class Push extends REST_Controller {

    public function android() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('token', 'Token', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('message', 'Message', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters!";
            echo json_encode($response);
            exit;
        }
        $token = $this->input->post('token');
        $message = $this->input->post('message');
        $result = $this->PushModel->sendGCM($message, array($token));
        print_r($result);
    }

    public function ios() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('token', 'Token', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('message', 'Message', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters!";
            echo json_encode($response);
            exit;
        }
        $token = $this->input->post('token');
        $message = $this->input->post('message');
        $this->PushModel->sendAPNS($message, array($token));
        $this->PushModel->getFeedbackService();
    }

}
