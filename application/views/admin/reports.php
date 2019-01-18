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
            <li class="active"><?php echo $this->lang->line('section_reports');?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner">
    <h3 class="page-header" dir="<?php echo $direction;?>"><?php echo $this->lang->line('section_reports');?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="table-responsive">
                <table id="table" class="table table-hover table-striped nowrap" width="100%">
                    <thead>
                        <tr>
                            <th><?php echo $this->lang->line('label_id');?></th>
                            <th><?php echo $this->lang->line('label_username');?></th>
                            <th><?php echo $this->lang->line('label_cause');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_type');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_total');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_view');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_delete_post');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_block_user');?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_delete_report');?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($reports as $row): ?>
                            <tr>
                                <td><?php echo $row->id; ?></td>
                                <td><?php echo $row->username; ?></td>
                                <td><?php echo $row->cause; ?></td>
                                <td class="text-center"><?php echo $row->type; ?></td>
                                <td class="text-center"><?php echo $row->reports; ?></td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" pid="<?php echo $row->post_id; ?>" type="button" class="viewpost btn btn-compact btn-block btn-default btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" pid="<?php echo $row->post_id; ?>" type="button" class="delpost btn btn-compact btn-block btn-warning btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" uid="<?php echo $row->user_id; ?>" type="button" class="blockuser btn btn-compact btn-block btn-danger btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-ban" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <button csrf_token="<?php echo $csrf['hash']; ?>" rid="<?php echo $row->id; ?>" type="button" class="delreport btn btn-compact btn-block btn-danger btn-sm" data-loading-text="<i class='fa fa-spinner fa-spin fa-lg fa-fw' style='color:#FFF'></i>">
                                            <i class="fa fa-times" aria-hidden="true"></i>
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
<div id="modalViewPost" class="modal fade" tabindex="-1" role="dialog">
    <!-- .modal-dialog -->
    <div class="modal-dialog" role="document">
        <!-- .modal-content -->
        <div class="modal-content">
            <div class="modal-header bg-success">
                <h4 class="modal-title">Post Information</h4>
            </div>
            <div class="modal-body" id="modalViewPostBody" style="min-height: 70px"></div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>