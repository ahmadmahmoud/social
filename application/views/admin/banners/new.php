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
    <!-- .app-content-inner -->
    <div class="app-content-inner">
        <!-- .content-breadcrumb -->
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('section_home');?></a></li>
            <li><a href="<?php echo $this->config->item('admin_url'); ?>banners"><?php echo $this->lang->line('section_banners');?></a></li>
            <li class="active"><?php echo $this->lang->line('label_new');?></li>
        </ol>
        <!-- /.content-breadcrumb -->
    </div>
    <!-- /.app-content-inner -->
</div>
<div class="app-content-inner" dir="<?php echo $direction;?>">
    <div class="row">
        <?php if($direction === 'rtl'){?>
        <div class="col-xs-12 col-sm-5"></div>
        <?php }?>
        <div class="col-xs-12 col-sm-7">
            <div class="panel">
                <form action="<?php echo $this->config->item('admin_url'); ?>banners/add" class="form-compound" id="formaddbanner" name="formaddbanner" method="POST" enctype="multipart/form-data">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_information');?></h3>
                    <div class="form-section">

                        <div class="form-group">
                            <!-- .col -->
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="url_android"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_url_android');?></label>
                                <input type="text" class="form-control" id="url_android" required="" name="url_android" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <!-- .col -->
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="url_ios"><abbr title="required">*</abbr> <?php echo $this->lang->line('label_url_ios');?></label>
                                <input type="text" class="form-control" id="url_ios" required="" name="url_ios" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <label class="control-label" for="banner"><?php echo $this->lang->line('label_image');?>  <i tabindex="0" class="fa fa-info-circle text-gray" data-toggle="tooltip" title="" data-original-title="Must be JPEG 900x300"></i></label>
                                <div class="custom-file-stacked">
                                    <label class="custom-file">
                                        <input type="file" id="banner" name="banner" class="custom-file-input" accept="image/jpeg,image/png,image/jpg">
                                        <span class="custom-file-control"></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="submit" class="btn btn-success" id="btnsave"><?php echo $this->lang->line('label_save');?></button>
                        </div>
                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                </form>
            </div>
        </div>
    </div>
</div>