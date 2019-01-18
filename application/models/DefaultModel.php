<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CommonModel
 *
 * @author Ahmad Mahmoud
 */
class DefaultModel extends CI_Model {
function __construct()
{
    // Call the Model constructor
    parent::__construct();
    $this->db->query("SET time_zone='+0:00'");
}
}
