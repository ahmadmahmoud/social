<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
/*$password = 'admin';
$salt = "$2a$" . PASSWORD_BCRYPT_COST . "$" . PASSWORD_SALT;
$newPassword = crypt($password, $salt);
echo $newPassword;
exit;*/
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500" rel="stylesheet">
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
        <link href="<?php echo base_url() ?>assets/base/sweetalert/sweetalert.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/layouts/layout/css/layout.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/components/css/components.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/components/css/plugins.min.css" rel="stylesheet" type="text/css">
        <link href="<?php echo base_url() ?>assets/globals/css/custom.min.css" rel="stylesheet" type="text/css">
        <!-- END YOUR CUSTOM STYLES -->

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
        <link href="<?php echo base_url() ?>assets/pages/css/signin.css" rel="stylesheet" type="text/css">
    </head>

    <body>
        <a href="#app-drawer-holder" class="sr-only sr-only-focusable" onfocus="vision.redrawPosition()" onblur="vision.redrawPosition()">
            <span class="btn btn-block btn-inverse rounded-0">Skip to main content</span>
        </a>
        <!--[if lte IE 9]>
          <div class="alert alert-banner alert-danger alert-solid" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="vision.redrawPosition()"><span aria-hidden="true">&times;</span></button>
            You are using an <strong>outdated</strong> browser. Please <a class="alert-link" href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.
        </div>
        <![endif]-->
        <!-- BEGIN APP MAIN -->
        <div id="app-main">
            <!-- BEGIN APP CONTENT -->
            <div id="app-content" class="app-content">
                <!-- BEGIN CONTENT BODY -->
                <div class="app-content-inner">
                    <!-- .panel-signin -->
                    <div class="panel panel-signin">
                        <!-- .panel-heading -->
                        <div class="panel-heading">
                            <h1 class="panel-title" style="font-size:24px;">App Admin</h1>
                        </div>
                        <!-- /.panel-heading -->
                        <!-- .panel-body -->
                        <div class="panel-body">
                            <!-- form -->
                            <form id="formlogin" method="post" autocomplete="off" novalidate>
                                <!-- .form-group -->
                                <div class="form-group">
                                    <label for="username" class="control-label">Username</label>
                                    <input id="username" name="username" type="text" class="form-control input-lg">
                                </div>
                                <!-- .form-group -->
                                <!-- /.form-group -->
                                <div class="form-group">
                                    <label for="password" class="control-label">Password</label>
                                    <input id="password" name="password" type="password" class="form-control input-lg">
                                </div>
                                <!-- .form-group -->
                                <!-- /.form-group -->
                                <div class="form-group clearfix">
                                    <div class="float-left">
                                        <label class="custom-control custom-checkbox custom-control-stacked mt-2">
                                            <input id="remember" name="remember" type="checkbox" class="custom-control-input" checked>
                                            <span class="custom-control-indicator"></span>
                                            <span class="custom-control-description">Remember me</span>
                                        </label>
                                    </div>
                                    <div class="float-right">
                                        <button id="btnlogin" type="submit" class="btn btn-success" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">Login</button>
                                    </div>
                                </div>
                                <!-- /.form-group -->
                                <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                            </form>
                            <!-- /form -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel-signin -->
                </div>
                <!-- END CONTENT BODY -->
            </div>
            <!-- END APP CONTENT -->
        </div>
        <!-- END APP MAIN -->

        <!-- BEGIN BASE JS -->
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/jquery/jquery.min.js"></script>
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
        <script type="text/javascript" src="<?php echo base_url() ?>assets/base/sweetalert/sweetalert.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/jquery-validation/jquery.validate.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/plugins/jquery-validation/additional-methods.min.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/moment.js"></script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/globals/js/moment-with-locales.min.js"></script>
        <script type="text/javascript">
            var BASE_URL = '<?php echo $this->config->item('admin_url'); ?>';
        </script>
        <script type="text/javascript" src="<?php echo base_url() ?>assets/admin/admin.js"></script>
    </body>
</html>