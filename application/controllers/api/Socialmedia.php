<?php

defined('BASEPATH') OR exit('No direct script access allowed');
require(APPPATH . 'libraries/REST_Controller.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Profile
 *
 * @author pslpt189
 */
class Socialmedia extends REST_Controller {

    public function __construct() {
        parent::__construct(TRUE);
    }
    
    public function add() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('type', 'Type', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('link', 'Link', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $this->failed(MSG_PARAM_INVALID);
        }
        $link = $this->input->post('link');
        if(!filter_var($link, FILTER_VALIDATE_URL)){
            $this->failed(MSG_INVALID_LINK);
        }
        $user_id = $this->user->id;
        $type = $this->input->post('type');
        
        $sql = "SELECT id FROM social_links WHERE social_media_id = ? AND user_id = ?";
        $query = $this->db->query($sql, array($type, $user_id));
        $result = $query->row();
        if ($result){
            $this->failed(MSG_MEDIATYPE_EXISTS);
        }
        $fields = array(
            'user_id' => $user_id,
            'social_media_id' => $type,
            'link' => $link,
            'created' => $this->datetime
        );
        
        $this->db->insert('social_links', $fields);
        $this->success(MSG_LINK_SUCCESS, array(), array());
    }
    
    public function update() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'Link ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('type', 'Type', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        $this->form_validation->set_rules('link', 'Link', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $this->failed(MSG_PARAM_INVALID);
        }
        $link = $this->input->post('link');
        if(!filter_var($link, FILTER_VALIDATE_URL)){
            $this->failed(MSG_INVALID_LINK);
        }
        $id = $this->input->post('id');
        $user_id = $this->user->id;
        $type = $this->input->post('type');
        
        $sql = "SELECT id FROM social_links WHERE social_media_id = ? AND user_id = ? AND id <> ?";
        $query = $this->db->query($sql, array($type, $user_id, $id));
        $result = $query->row();
        if ($result){
            $this->failed(MSG_MEDIATYPE_EXISTS);
        }
        $fields = array(
            'user_id' => $user_id,
            'social_media_id' => $type,
            'link' => $link
        );
        
        $this->db->update('social_links', $fields, array('id' => $id));
        $this->success(MSG_LINK_UPDATED, array(), array());
    }
    
    public function delete() {
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('id', 'Link ID', 'trim|required|integer|is_natural_no_zero|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $this->failed(MSG_LINK_ID_REQUIRE);
        }
        $user_id = $this->user->id;
        $link_id = $this->input->post('id');
        
        $sql = "SELECT id FROM social_links WHERE social_media_id = ? AND user_id = ?";
        $query = $this->db->query($sql, array($link_id, $user_id));
        $result = $query->row();
        if (!$result){
            $this->failed(MSG_LINK_NOTFOUND);
        }
        
        $this->db->delete('social_links', array('social_media_id' => $link_id));
        $this->success(MSG_LINK_DELETED, array(), array());
    }

}
