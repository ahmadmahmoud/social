<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction; ?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home'); ?></a></li>
            <li class="active"><?php echo $this->lang->line('section_requests'); ?></li>
        </ol>
    </div>
</div>
<div class="app-content-inner" id="supportpage">
    <h3 class="page-header" dir="<?php echo $direction; ?>"><?php echo $this->lang->line('section_requests'); ?></h3>
    <div class="content-section">
        <div class="panel panel-default">
            <div class="table-responsive">
                <table id="table" class="table table-hover nowrap" width="100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th><?php echo $this->lang->line('label_username'); ?></th>
                            <th><?php echo $this->lang->line('label_newusername'); ?></th>
                            <th><?php echo $this->lang->line('label_date'); ?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_approve'); ?></th>
                            <th class="text-center"><?php echo $this->lang->line('label_reject'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $count = 1;
                        foreach ($requests as $row) {
                            ?>
                            <tr>
                                <td><?php echo $count; ?></td>
                                <td><?php echo $row->username; ?></td>
                                <td><?php echo $row->newusername; ?></td>
                                <td><?php echo $row->created; ?></td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <i csrf_token="<?php echo $csrf['hash']; ?>" class="fa fa-check approverequest" request_id="<?php echo $row->id; ?>" id="request_id<?php echo $row->id; ?>" aria-hidden="true" style="color:#038f79;cursor:pointer;"></i>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="form-group">
                                        <i csrf_token="<?php echo $csrf['hash']; ?>" class="fa fa-times rejectrequest" request_id="<?php echo $row->id; ?>" id="request_id<?php echo $row->id; ?>" aria-hidden="true" style="color:#a94442;cursor:pointer;"></i>
                                    </div>
                                </td>
                            </tr>
                            <?php
                            $count++;
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div id="modalSupport" class="modal fade" tabindex="-1" role="dialog">
    <!-- .modal-dialog -->
    <div class="modal-dialog" role="document">
        <!-- .modal-content -->
        <div class="modal-content">
            <div class="modal-header bg-success">
                <h4 class="modal-title" id="modalSupportTitle">Post Information</h4>
            </div>
            <div class="modal-body" id="modalSupportBody" style="min-height: 70px"></div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>