<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Description of Banners
 *
 * @author Ahmad Mahmoud
 */
class Banners extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            redirect($this->config->item('admin_url'), 'refresh');
        }
    }

    public function index() {
        $result = $this->AdminModel->getBanners();
        $data = array(
            'view' => 'admin/banners/index',
            'list' => $result
        );
        $this->load->view('layouts/admin', $data);
    }

    public function edit($id) {
        if (!filter_var($id, FILTER_VALIDATE_INT)) {
            redirect($this->config->item('admin_url') . 'banners', 'refresh');
        }
        $banner = $this->AdminModel->getBanner($id);
        if (!$banner) {
            redirect($this->config->item('admin_url') . 'banners', 'refresh');
        }
        $data = array(
            'view' => 'admin/banners/edit',
            'banner' => $banner
        );
        $this->load->view('layouts/admin', $data);
    }

    public function create() {
        $data = array('view' => 'admin/banners/new');
        $this->load->view('layouts/admin', $data);
    }

    public function add() {
        $response = array('success' => FALSE, 'msg' => '');
        if (!$this->AdminModel->verifyRequest()) {
            $response['msg'] = "Invalid Request!";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('url_android', 'url_android', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('url_ios', 'url_ios', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $url_android = $this->input->post('url_android');
        $url_ios = $this->input->post('url_ios');

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '1024';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if ($this->upload->do_upload('banner')) {
            $file = $this->upload->data();
            $file_name = $file['file_name'];
            rename(UPLOAD_PATH . $file_name, BANNER_URL . $file_name);
        } else {
            $file_name = 'default_banner.png';
        }

        try {
            $created = date('Y-m-d H:i:s');
            $fields = array(
                'image' => $file_name,
                'url_ios' => $url_ios,
                'url_android' => $url_android,
                'active' => 1,
                'created' => $created
            );
            $this->db->insert('banners', $fields);
            $response['success'] = TRUE;
        } catch (Exception $ex) {
            $response['msg'] = $ex->getMessage();
        }
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
        $this->form_validation->set_rules('id', 'ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('url_android', 'url_android', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('url_ios', 'url_ios', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $id = $this->input->post('id');
        $url_android = $this->input->post('url_android');
        $url_ios = $this->input->post('url_ios');

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '1024';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $fields = array(
            'url_ios' => $url_ios,
            'url_android' => $url_android,
        );

        if ($this->upload->do_upload('banner')) {
            $file = $this->upload->data();
            $file_name = $file['file_name'];
            rename(UPLOAD_PATH . $file_name, BANNER_URL . $file_name);
            $fields['image'] = $file_name;
        }

        try {
            $this->db->update('banners', $fields, array('id' => $id));
            $response['success'] = TRUE;
        } catch (Exception $ex) {
            $response['msg'] = $ex->getMessage();
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
        try {
            $this->db->delete('banners', array('id' => $id));
            $response['msg'] = "Banner has been deleted!";
            $response['success'] = true;
        } catch (Exception $ex) {
            $response['msg'] = "Invalid Parameters";
        }
        echo json_encode($response);
        exit;
    }

}
