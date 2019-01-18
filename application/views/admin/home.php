<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$monthlyusersdata = implode(",", array_values($users));
$likesdata = implode(",", array_values($likes));
$dislikesdata = implode(",", array_values($dislikes));
$commentsdata = implode(",", array_values($comments));
$downloadsdata = implode(",", array_values($downloads));
$posttextdata = implode(",", array_values($posttext));
$postimagedata = implode(",", array_values($postimage));
$postgifdata = implode(",", array_values($postgif));
$postvideodata = implode(",", array_values($postvideo));
$postmessagesdata = implode(",", array_values($postmessages));
$supportsdate = implode(",", array_values($supports));
$supportanswereddate = implode(",", array_values($supportanswered));
$deletedusersdata = implode(",", array_values($deletedusers));
$copiesdata = implode(",", array_values($copies));
$postdeleteddata = implode(",", array_values($postdeleted));
$monthly = implode(",", array_values($months));

$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction;?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('section_home');?></a></li>
        </ol>
    </div>
</div>
<div class="app-content-inner" dir="<?php echo $direction;?>">
    <div class="content-section">
        <div class="collapse content-heading-collapse example-content-header-collapse">
            <!-- .content-toolbar -->
            <div class="content-toolbar">
                <!-- .form-inline -->
                <form class="form-inline">
                    <!-- .form-group -->
                    <div class="form-group">
                        <button type="button" class="btn btn-compact btn-block btn-success" id="btnexportdata">
                            <i class="fa fa-plus"></i> <?php echo $this->lang->line('label_export');?>
                        </button>
                    </div>
                    <!-- /.form-group -->
                </form>
                <!-- /.form-inline -->
            </div>
            <!-- /.content-toolbar -->
        </div>
    </div>


    <div class="row">
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_registeredusers');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlyusers" months="<?php echo $monthly; ?>" data="<?php echo $monthlyusersdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_deletedusers');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlydeletedusers" months="<?php echo $monthly; ?>" data="<?php echo $deletedusersdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_likes');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlylikes" months="<?php echo $monthly; ?>" data="<?php echo $likesdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_dislikes');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlydislikes" months="<?php echo $monthly; ?>" data="<?php echo $dislikesdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_comments');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlycomments" months="<?php echo $monthly; ?>" data="<?php echo $commentsdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_downloads');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlydownloads" months="<?php echo $monthly; ?>" data="<?php echo $downloadsdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_text');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlyposttext" months="<?php echo $monthly; ?>" data="<?php echo $posttextdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_image');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlypostimage" months="<?php echo $monthly; ?>" data="<?php echo $postimagedata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_gif');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlypostgif" months="<?php echo $monthly; ?>" data="<?php echo $postgifdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_video');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlypostvideo" months="<?php echo $monthly; ?>" data="<?php echo $postvideodata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_messages');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlypostmessages" months="<?php echo $monthly; ?>" data="<?php echo $postmessagesdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_support');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlysupports" months="<?php echo $monthly; ?>" data="<?php echo $supportsdate; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="row">
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_support_answered');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlysupportanswered" months="<?php echo $monthly; ?>" data="<?php echo $supportanswereddate; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_copy');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlycopies" months="<?php echo $monthly; ?>" data="<?php echo $copiesdata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3">
            <div class="panel">
                <div class="panel-heading">
                    <h4 class="panel-title"><?php echo $this->lang->line('label_post_deleted');?></h4>
                </div>
                <div class="panel-body">
                    <div class="chartjs">
                        <canvas id="monthlypostdeleted" months="<?php echo $monthly; ?>" data="<?php echo $postdeleteddata; ?>"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-sm-3"></div>
        <div class="clearfix"></div>
    </div>

</div>