<?php

defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Admin
 *
 * @author Ahmad Mahmoud
 */
class Home extends CI_Controller {

    public function __construct() {
        parent::__construct();
        if (!$this->session->has_userdata('admin')) {
            $cookie_id = $this->input->cookie(ADMIN_COOKIENAME);
            if ($cookie_id !== NULL) {
                $this->AdminModel->validateAdmin($cookie_id);
            }
        }
    }

    public function timezone() {
        $response = array('success' => FALSE, 'msg' => '', 'data' => '');
        if (!$this->AdminModel->isAjaxRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('offset', 'Offset', 'trim|required|min_length[1]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $offset = $this->input->post('offset');
        $admin = $this->session->userdata('admin');
        $id = $admin['id'];
        $this->db->update('admin', array('timezone' => $offset), "id = $id");

        $arr_admin = array(
            'id' => $id,
            'name' => $admin['name'],
            'username' => $admin['username'],
            'timezone' => $offset
        );
        $this->session->set_userdata('admin', $arr_admin);
        $response['success'] = true;
        echo json_encode($response);
        exit;
    }

    public function changeLang() {
        $response = array('success' => FALSE, 'msg' => '', 'data' => '');
        if (!$this->AdminModel->isAjaxRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $post = $this->input->post();
        $this->form_validation->set_data($post);
        $this->form_validation->set_rules('lang', 'Language', 'trim|required|min_length[2]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = "Invalid Parameters";
            echo json_encode($response);
            exit;
        }
        $lang = $this->input->post('lang');

        $obj = $this->AdminModel->getLanguage($lang);
        if (!$obj) {
            $response['msg'] = MSG_LANG_UNKNOWN;
            echo json_encode($response);
            exit;
        }

        $adminlang = array(
            'id' => $obj->id,
            'name' => $obj->name,
            'code' => $obj->code,
            'flag' => $obj->flag,
            'iso' => $obj->iso,
            'default' => $obj->default,
            'dir' => $obj->dir
        );

        $this->session->set_userdata(SESSION_LANG, $adminlang);
        $response['success'] = true;
        echo json_encode($response);
        exit;
    }

    /*public function otherapps() {
        if (!$this->session->has_userdata('admin')) {
            $this->load->view('admin/login');
            return false;
        } else {
            $app_id = $this->CommonModel->getCurrentAppId();
            $appsdb = $this->load->database('apps', TRUE);
            $sql = "SELECT * FROM apps WHERE app_id <> {$app_id} ORDER BY name ASC";
            $query = $appsdb->query($sql);
            $apps = $query->result();
            $data = array(
                'view' => 'admin/otherapps',
                'apps' => $apps
            );
            $this->load->view('layouts/admin', $data);
        }
    }*/

    public function export() {
        if (!$this->session->has_userdata('admin')) {
            $this->load->view('admin/login');
            return false;
        } else {
            $date = new DateTime('now');
            $thismonth = $date->format('Y-m');
            $thismonthname = $date->format('F');
            $date->modify('previous month');
            $premonth = $date->format('Y-m');
            $premonthname = $date->format('F');
            $months = array($premonthname, $thismonthname);
            $users = $this->AdminModel->getMonthlyUsers($premonth, $thismonth);
            $likes = $this->AdminModel->getMonthlyLikes($premonth, $thismonth);
            $dislikes = $this->AdminModel->getMonthlyDislikes($premonth, $thismonth);
            $comments = $this->AdminModel->getMonthlyComments($premonth, $thismonth);
            $downloads = $this->AdminModel->getMonthlyDownloads($premonth, $thismonth);
            $posttext = $this->AdminModel->getMonthlyPostText($premonth, $thismonth);
            $postimage = $this->AdminModel->getMonthlyPostImage($premonth, $thismonth);
            $postgif = $this->AdminModel->getMonthlyPostGif($premonth, $thismonth);
            $postvideo = $this->AdminModel->getMonthlyPostVideo($premonth, $thismonth);
            $postmessages = $this->AdminModel->getMonthlyPostMessages($premonth, $thismonth);
            $support = $this->AdminModel->getMonthlySupport($premonth, $thismonth);
            $supportanswered = $this->AdminModel->getMonthlySupportAnswered($premonth, $thismonth);
            $deletedusers = $this->AdminModel->getDeletedUsers($premonth, $thismonth);
            $copies = $this->AdminModel->getMonthlyCopy($premonth, $thismonth);
            $postdeleted = $this->AdminModel->getMonthlyPostDeleted($premonth, $thismonth);
            $list = array(
                "Action,{$premonthname},{$thismonthname}",
                "Registered Users,{$users['premonth']},{$users['thismonth']}",
                "Deleted Users,{$deletedusers['premonth']},{$deletedusers['thismonth']}",
                "Likes,{$likes['premonth']},{$likes['thismonth']}",
                "Dislikes,{$dislikes['premonth']},{$dislikes['thismonth']}",
                "Comments,{$comments['premonth']},{$comments['thismonth']}",
                "Downloads,{$downloads['premonth']},{$downloads['thismonth']}",
                "Post Text,{$posttext['premonth']},{$posttext['thismonth']}",
                "Post Image,{$postimage['premonth']},{$postimage['thismonth']}",
                "Post Gif,{$postgif['premonth']},{$postgif['thismonth']}",
                "Post Video,{$postvideo['premonth']},{$postvideo['thismonth']}",
                "Post Copy,{$copies['premonth']},{$copies['thismonth']}",
                "Post Deleted,{$postdeleted['premonth']},{$postdeleted['thismonth']}",
                "Messages,{$postmessages['premonth']},{$postmessages['thismonth']}",
                "Support,{$support['premonth']},{$support['thismonth']}",
                "Support Answered,{$supportanswered['premonth']},{$supportanswered['thismonth']}"
            );
            $filename = './public/uploads/export_' . strtolower($premonthname) . '_' . strtolower($thismonthname) . '.csv';
            $file = fopen($filename, "w");
            foreach ($list as $line) {
                fputcsv($file, explode(',', $line));
            }
            fclose($file);

            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=$filename");
            header("Content-Type: text/csv");
            header("Content-Transfer-Encoding: binary");
            readfile($filename);
        }
    }

    public function index() {
        if (!$this->session->has_userdata('admin')) {
            $this->load->view('admin/login');
            return false;
        } else {
            $date = new DateTime('now');
            $thismonth = $date->format('Y-m');
            $thismonthname = $date->format('F');
            $date->modify('previous month');
            $premonth = $date->format('Y-m');
            $premonthname = $date->format('F');
            $months = array($premonthname, $thismonthname);
            $users = $this->AdminModel->getMonthlyUsers($premonth, $thismonth);
            $likes = $this->AdminModel->getMonthlyLikes($premonth, $thismonth);
            $dislikes = $this->AdminModel->getMonthlyDislikes($premonth, $thismonth);
            $comments = $this->AdminModel->getMonthlyComments($premonth, $thismonth);
            $downloads = $this->AdminModel->getMonthlyDownloads($premonth, $thismonth);
            $posttext = $this->AdminModel->getMonthlyPostText($premonth, $thismonth);
            $postimage = $this->AdminModel->getMonthlyPostImage($premonth, $thismonth);
            $postgif = $this->AdminModel->getMonthlyPostGif($premonth, $thismonth);
            $postvideo = $this->AdminModel->getMonthlyPostVideo($premonth, $thismonth);
            $postmessages = $this->AdminModel->getMonthlyPostMessages($premonth, $thismonth);
            $support = $this->AdminModel->getMonthlySupport($premonth, $thismonth);
            $supportanswered = $this->AdminModel->getMonthlySupportAnswered($premonth, $thismonth);
            $deletedusers = $this->AdminModel->getDeletedUsers($premonth, $thismonth);
            $copies = $this->AdminModel->getMonthlyCopy($premonth, $thismonth);
            $postdeleted = $this->AdminModel->getMonthlyPostDeleted($premonth, $thismonth);
            $data = array(
                'view' => 'admin/home',
                'users' => $users,
                'likes' => $likes,
                'dislikes' => $dislikes,
                'comments' => $comments,
                'downloads' => $downloads,
                'posttext' => $posttext,
                'postimage' => $postimage,
                'postgif' => $postgif,
                'postvideo' => $postvideo,
                'postmessages' => $postmessages,
                'supports' => $support,
                'supportanswered' => $supportanswered,
                'deletedusers' => $deletedusers,
                'copies' => $copies,
                'postdeleted' => $postdeleted,
                'months' => $months
            );
            $this->load->view('layouts/admin', $data);
        }
    }

    public function login() {
        $response = array('success' => FALSE, 'msg' => '', 'data' => '');
        if (!$this->AdminModel->isAjaxRequest()) {
            $response['msg'] = "Invalid Request";
            echo json_encode($response);
            exit;
        }
        $this->form_validation->set_rules('username', 'Username', 'trim|required|min_length[2]');
        $this->form_validation->set_rules('password', 'Password', 'trim|required|min_length[4]');
        if ($this->form_validation->run() == FALSE) {
            $response['msg'] = 'Invalid Parameters';
            echo json_encode($response);
            exit;
        }
        $username = $this->input->post('username');
        $password = $this->input->post('password');
        $remember = ($this->input->post('remember')) ? TRUE : FALSE;
        $loginAttempts = $this->AdminModel->getLoginAttempts();
        if ($loginAttempts > LOGIN_MAX_LOGIN_ATTEMPTS) {
            $response['msg'] = ERROR_BRUTE_FORCE;
            echo json_encode($response);
            exit;
        }
        $bcrypt_pass = $this->AdminModel->hashPassword($password);
        if ($this->AdminModel->validate($username, $bcrypt_pass, $remember, $loginAttempts)) {
            $response['success'] = true;
            echo json_encode($response);
            exit;
        } else {
            $response['msg'] = ERROR_WRONG_USERNAME_PASSWORD;
            echo json_encode($response);
            exit;
        }
    }

}
