<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction;?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home');?></a></li>
            <li class="active"><?php echo $this->lang->line('section_banners');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner">
    <h3 class="page-header" dir="<?php echo $direction;?>"><?php echo $this->lang->line('section_banners');?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="panel-heading" dir="<?php echo $direction;?>">
                <!-- Collect the buttons, forms components, and other content for toggling -->
                <div class="collapse content-heading-collapse example-content-header-collapse">
                    <!-- .content-toolbar -->
                    <div class="content-toolbar">
                        <!-- .form-inline -->
                        <form class="form-inline">
                            <!-- .form-group -->
                            <div class="form-group">
                                <a href="<?php echo $this->config->item('admin_url'); ?>banners/new">
                                   <button type="button" class="btn btn-compact btn-block btn-success">
                                        <i class="fa fa-plus"></i> <?php echo $this->lang->line('label_new');?>
                                    </button>
                                </a>
                            </div>
                            <!-- /.form-group -->
                        </form>
                        <!-- /.form-inline -->
                    </div>
                    <!-- /.content-toolbar -->
                </div>
                <!-- /.collapse -->
            </div>
            <div class="table-responsive">
                <table id="table" class="table table-hover table-striped nowrap" width="100%">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('label_id');?></th>
                            <th><?php echo $this->lang->line('label_image');?></th>
                            <th>Android</th>
                            <th>iOS</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($list as $row): ?>
                            <tr>
                                <td><a href="<?php echo $this->config->item('admin_url') . "banners/" . $row->id; ?>"><?php echo $row->id; ?></a></td>
                                <td>
                                    <?php if ($row->image): ?>
                                        <a data-fancybox="group" href="<?php echo base_url() . BANNER_URL . $row->image; ?>">
                                            <img style="width: 160px;height: 60px" src="<?php echo base_url() . BANNER_URL . $row->image; ?>">
                                        </a>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo $row->url_android; ?></td>
                                <td><?php echo $row->url_ios; ?></td>
                                <td>
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" bid="<?php echo $row->id; ?>" type="button" class="delbanner btn btn-compact btn-block btn-danger btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
