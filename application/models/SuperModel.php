<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SuperModel
 *
 * @author Ahmad Mahmoud
 */
class SuperModel extends CI_Model {
function __construct()
{
    parent::__construct();
    $this->db->query("SET time_zone='+3:00'");
}
}
