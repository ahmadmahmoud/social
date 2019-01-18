<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
date_default_timezone_set("UTC");
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
class Forsale extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }

    public function add() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('title', 'Title', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('description', 'Description', 'trim|required|min_length[1]');
        $this->form_validation->set_rules('price', 'Price', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $this->failed(MSG_PARAM_INVALID);
        }
        $sql = "SELECT allow_forsale FROM settings LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        $allow_forsale = $result->allow_forsale;
        if(!$allow_forsale){
            $this->failed(MSG_ALLOW_FORSALE);
        }
        
        $user_id = $this->user->id;
        $title = $this->input->post('title');
        $description = $this->input->post('description');
        $price = $this->input->post('price');

        $config['upload_path'] = './public/uploads/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['max_size'] = '3072';
        $config['encrypt_name'] = TRUE;
        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        $img = null;
        if ($this->upload->do_upload('img')) {
            $img = $this->upload->data();
            $file_size = $img['file_size'];
            if ($file_size) {
                $img_name = $img['file_name'];
                $orig_name = $img['orig_name'];
                rename(UPLOAD_PATH . $img_name, UPLOAD_PATH_IMG . $img_name);
            }
        }else{
            $img_name = 'default_forsale.png';
            $orig_name = 'default_forsale.png';
        }

        $created = date('Y-m-d H:i:s');
        $fields = array(
            'user_id' => $user_id,
            'text' => '',
            'vid' => '',
            'pdf' => '',
            'thumb' => '',
            'filename' => $orig_name,
            'img' => $img_name,
            'type' => 'image',
            'vid_desc' => '',
            'img_desc' => '',
            'title' => $title,
            'description' => $description,
            'price' => $price,
            'is_forsale' => 1,
            'likes_list' => '',
            'dislikes_list' => '',
            'created' => $created
        );
        $this->db->insert('posts', $fields);

        $sql = "SELECT maxpostcount FROM `settings` LIMIT 1";
        $query = $this->db->query($sql);
        $result = $query->row();
        $maxpostcount = $result->maxpostcount;

        $sql = "SELECT COUNT(id) as total FROM `posts`";
        $query = $this->db->query($sql);
        $result = $query->row();
        $total = $result->total;

        if ($total > $maxpostcount) {
            $sql = "SELECT MIN(id) as minid FROM `posts`";
            $query = $this->db->query($sql);
            $result = $query->row();
            $minid = $result->minid;
            $this->db->query("DELETE FROM posts WHERE id = {$minid}");
        }
        $this->success(MSG_POST_SUCCESS, array(), array());
    }

}