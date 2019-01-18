<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$segment1 = $this->uri->segment(1, NULL);
$segment2 = $this->uri->segment(2, NULL);
$segment3 = $this->uri->segment(3, NULL);
$settings = $this->AdminModel->getSettings();
if (!$this->session->has_userdata(SESSION_LANG)) {
    $obj = $this->AdminModel->getLanguage('en');
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
}
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
$adminobj = $this->session->userdata('admin');
$timezone = '+03:00';//$adminobj['timezone'];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
        <title><?php echo $settings->app_name;?></title>
        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echo base_url() ?>public/assets/apple-touch-icon.png">
        <link rel="icon" type="image/png" href="<?php echo base_url() ?>public/assets/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="<?php echo base_url() ?>public/assets/favicon-16x16.png" sizes="16x16">
        <link rel="favicon" href="<?php echo base_url() ?>public/assets/favicon.ico">
        <!-- Font -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500" rel="stylesheet">

        <!-- BEGIN BASE STYLES -->
        <link href="<?php echo base_url() ?>assets/base/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/flag-icon-css/css/flag-icon.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/simple-line-icons/css/simple-line-icons.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/animate.css/animate.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/loaders/loaders.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/pace/themes/vision/pace-theme-minimal.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/dragula.js/dragula.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/base/toastr/toastr.min.css" rel="stylesheet" type="text/css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.9/sweetalert2.min.css" rel="stylesheet" type="text/css">
        
        <!-- END BASE STYLES -->

        <!-- BEGIN PAGE LEVEL PLUGINS STYLES -->
        <link href="<?php echo base_url() ?>assets/globals/css/jquery.fancybox.min.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo base_url() ?>assets/plugins/datatables/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" type="text/css">
        <!-- END PAGE LEVEL PLUGINS STYLES -->

        <!-- BEGIN LAYOUT STYLES -->
        <link href="<?php echo base_url() ?>assets/layouts/drawerjs/css/drawerjs.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/layouts/drawerjs/css/stacked-menu.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css">
        <!-- END LAYOUT STYLES -->

        <!-- BEGIN COMPONENTS REFLOW STYLES -->
        <link href="<?php echo base_url() ?>assets/components/css/components.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/components/css/plugins.min.css" rel="stylesheet" type="text/css">
        <!-- END COMPONENTS REFLOW STYLES -->

        <!-- BEGIN SPECIFIC PAGE STYLES -->
        <!-- END SPECIFIC PAGE STYLES -->

        <!-- BEGIN THEME STYLES -->
        <!-- theme will place after this element dinamically via vision.handleThemeChange(themeName) -->
        <link id="app-theme">
        <!-- BEGIN THEME STYLES -->

        <!-- BEGIN YOUR CUSTOM STYLES -->
        <link href="<?php echo base_url() ?>assets/globals/css/custom.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/admin/admin.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/admin/magic-check.min.css" rel="stylesheet" type="text/css">
        <link href="https://cdn.quilljs.com/1.3.4/quill.snow.css" rel="stylesheet">
        <link href="<?php echo base_url() ?>assets/plugins/plyr/plyr.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/admin/chat.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/admin/grid.css" rel="stylesheet" type="text/css">
        <!-- END YOUR CUSTOM STYLES -->

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <!-- BEGIN APP MAIN -->
        <div id="app-main">
            <!-- BEGIN APP HEADER -->
            <?php $this->load->view('admin/header'); ?>
            <!-- END APP HEADER -->

            <!-- BEGIN APP CONTENT -->
            <div id="app-content" class="app-content">
                <!-- BEGIN APP DRAWER -->
                <?php $this->load->view('admin/drawer'); ?>
                <!-- END APP DRAWER -->

                <!-- BEGIN APP DRAWER HOLDER -->
                <div id="app-drawer-holder">
                    <?php $this->load->view($view); ?>
                </div>
                <!-- END APP DRAWER HOLDER -->
            </div>
            <!-- END APP CONTENT -->

            <!-- BEGIN App footer -->
            <?php $this->load->view('admin/footer'); ?>
            <!-- END App footer -->
        </div>
        <!-- END APP MAIN -->

        <!-- BEGIN BASE JS -->
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/jquery/jquery.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/jquery/jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/pace/pace.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/screenfull/screenfull.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/autosize/autosize.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/clipboard/clipboard.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/dragula.js/dragula.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/spin.js/spin.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/loaders/loaders.css.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/perfect-scrollbar/js/perfect-scrollbar.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/toastr/toastr.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.9/sweetalert2.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>
        <!-- END BASE JS -->
        
        <?php if(!$timezone){?>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/timezone.js"></script>
        <?php }?>

        <!-- BEGIN PAGE LEVEL PLUGINS JS -->
        <!-- END PAGE LEVEL PLUGINS JS -->

        <!-- BEGIN LAYOUT JS -->
        <script type="text/javascript" src="<?php echo base_url() ?>assets/layouts/drawerjs/js/drawerjs.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/layouts/drawerjs/js/stacked-menu.min.js"></script>
        <!-- END LAYOUT JS -->

        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/chart.js/Chart.min.js"></script>

        <!-- BEGIN PAGE LEVEL PLUGINS JS -->
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/jquery.fancybox.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/jquery-validation/jquery.validate.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/jquery-validation/additional-methods.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/datatables/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/datatables/dataTables.bootstrap.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/jquery.numeric.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/bootbox.js/bootbox.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/moment.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/moment-with-locales.min.js"></script>

        <script type="text/javascript">
            var DASHBOARD_DIR = '<?php echo ($direction === 'ltr') ? 'left' : 'right'; ?>';
        </script>
        <!-- END PAGE LEVEL PLUGINS JS -->

        <!-- BEGIN GLOBALS JS -->
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/app.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/configs.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/setup.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/components.min.js"></script>
        <script type="text/javascript" src="https://cdn.quilljs.com/1.3.4/quill.js"></script>
        <?php if ($segment1 === 'admin' && $segment2 === 'messages'):?>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/pages/js/reference-details.js"></script>
        <?php endif; ?>
        <!-- END GLOBALS JS -->

        <!-- BEGIN PAGE(S) JS -->
        <!-- END PAGE(S) JS -->
        <script type="text/javascript">
            var BASE_URL = '<?php echo $this->config->item('admin_url'); ?>';
        </script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/plyr/plyr.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/salvattore.min.js"></script>
        <?php if($direction == 'ltr'){?>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/admin.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/home.js"></script>
        <?php }else{?>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/admin.ar.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/home.ar.js"></script>
        <?php }?>
    </body>
</html>