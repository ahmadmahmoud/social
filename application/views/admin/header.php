<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$langs = $this->CommonModel->getLanguages();
$admin = $this->session->userdata('admin');
$admin_username = $admin['username'];
$admin_name = $admin['name'];
$settings = $this->AdminModel->getSettings();
$app_name = $settings->app_name;
$app_logo = base_url() . URL_LOGO . $settings->logo;
if (!$this->session->has_userdata(SESSION_LANG)) {
    foreach ($langs as $row):
        if ($row->default):
            $lang_arr = array();
            $lang_arr['id'] = $row->id;
            $lang_arr['name'] = $row->name;
            $lang_arr['code'] = $row->code;
            $lang_arr['flag'] = $row->flag;
            $lang_arr['iso'] = $row->iso;
            $lang_arr['default'] = $row->default;
            $lang_arr['dir'] = $row->dir;
            $this->session->set_userdata(SESSION_LANG, $lang_arr);
        endif;
    endforeach;
}
$adminlang = $this->session->userdata(SESSION_LANG);
$current_lang = $adminlang['name'];
$current_code = $adminlang['code'];
$current_flag = $adminlang['iso'];
$current_dir = $adminlang['dir'];
$this->lang->load('labels', strtolower($current_lang));
//$this->lang->load('label', strtolower($current_lang));
?>
<div id="app-header" class="app-header">
    <!-- .navbar -->
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container-fluid">
            <div class="float-<?php echo ($current_dir === 'ltr') ? 'left' : 'right';?>">
                <!-- drawer handler -->
                <button type="button" class="navbar-toggle d-block" data-toggle="drawer">
                    <span class="sr-only">Toggle global navigations</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- navbar title -->
                <h1 class="navbar-brand has-logo">
                    <a href="<?php echo $this->config->item('admin_url'); ?>" title="<?php echo $app_name; ?>">
                        <?php echo $app_name; ?>
                    </a>
                </h1>
            </div>
            <!-- .float-right -->
            <div class="float-<?php echo ($current_dir === 'ltr') ? 'right' : 'left';?>">
                <!-- uncollapsible block -->
                <div class="navbar-tools float-<?php echo ($current_dir === 'ltr') ? 'left' : 'right';?>">
                    <!-- navigation right -->
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" title="Toggle Language">
                                <i class="flag-icon flag-icon-<?php echo $current_flag; ?>"></i> <small class="hidden-xs"><?php echo $current_lang; ?></small><span class="caret float-right float-md-none"></span>
                            </a>
                            <!-- .dropdown-menu -->
                            <ul class="dropdown-menu dropdown-menu-checker animated zoomIn" data-selectable="checked" data-selectable-radio="">
                                <!-- dropdown item -->
                                <?php
                                foreach ($langs as $row):
                                    $checked = ($row->code === $current_code) ? "checked" : "";
                                    $icon = $row->iso;
                                    ?>
                                    <li class="selectable-item <?php echo $checked; ?>">
                                        <a style="cursor: pointer" class="langselector" lang="<?php echo $row->code; ?>" csrf_token="<?php echo $csrf['hash']; ?>">
                                            <span class="dropdown-icon dropdown-icon-right checker">
                                                <i class="fa fa-check text-muted" aria-label="<?php echo $icon; ?>"></i>
                                            </span>
                                            <span class="dropdown-icon"><i class="flag-icon flag-icon-<?php echo $icon; ?>"></i></span>
                                            <span><?php echo $row->name; ?></span>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                                <!-- dropdown item -->
                            </ul>
                            <!-- /.dropdown-menu -->
                        </li>

                        <!-- User -->
                        <li class="dropdown dropdown-sm">
                            <a href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" title="<?php echo $app_name; ?>">
                                <span class="hidden-xs"><img class="avatar" src="<?php echo $app_logo; ?>" alt="<?php echo $app_name; ?>"></span>
                                <span class="visible-xs-inline"><i class="icon-user fa-fw mr-3 visible-xs-inline"></i><?php echo $app_name; ?></span>
                                <span class="caret float-right float-md-none"></span>
                            </a>
                            <!-- .dropdown-menu -->
                            <ul class="dropdown-menu dropdown-menu-right animated zoomIn">
                                <li><a href="<?php echo $this->config->item('admin_url'); ?>agreement" title="<?php echo $this->lang->line('section_agreement'); ?>"><?php echo $this->lang->line('section_agreement'); ?></a></li>
                                <li><a href="<?php echo $this->config->item('admin_url'); ?>admobs" title="<?php echo $this->lang->line('section_admobs'); ?>"><?php echo $this->lang->line('section_admobs'); ?></a></li>
                                <li class="divider"></li>
                                <li><a href="<?php echo $this->config->item('admin_url'); ?>settings" title="<?php echo $this->lang->line('section_settings'); ?>"><?php echo $this->lang->line('section_settings'); ?></a></li>
                                <li class="divider"></li>
                                <li><a href="<?php echo $this->config->item('admin_url'); ?>logout" title="<?php echo $this->lang->line('section_logout'); ?>"><?php echo $this->lang->line('section_logout'); ?></a></li>
                            </ul>
                            <!-- /.dropdown-menu -->
                        </li>
                        <!-- /User -->
                    </ul>
                </div>
                <!-- /.navbar-tools -->
            </div>
            <!-- /.float-right -->
        </div>
        <!-- /.container -->
    </nav>
    <!-- /.navbar -->
</div>