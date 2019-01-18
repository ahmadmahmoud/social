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
            <li class="active"><?php echo $this->lang->line('label_agreement');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner">
    <div class="row">
        <div class="col-xs-12 col-sm-12">
            <div class="panel">
                <form class="form-compound" id="formagreement" name="formagreement" method="POST">
                    <h3 class="form-section-heading"><?php echo $this->lang->line('label_agreement');?></h3>
                    <div class="form-section">
                        <div class="form-group">
                            <div class="col-xs-12 col-sm-12">
                                <div id="editor"><?php echo ($result) ? $result->content : ""; ?></div>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-success" id="saveagreement" style="color: #ffffff"><?php echo $this->lang->line('label_save');?></button>
                        </div>
                    </div>
                    <input type="hidden" name="<?php echo $csrf['name']; ?>" id="<?php echo $csrf['name']; ?>" value="<?php echo $csrf['hash']; ?>">
                </form>
            </div>
        </div>
    </div>
</div>
</div>