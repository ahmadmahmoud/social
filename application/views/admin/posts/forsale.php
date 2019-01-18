<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$csrf = array(
    'name' => $this->security->get_csrf_token_name(),
    'hash' => $this->security->get_csrf_hash()
);
$posts = $result['result'];
$count = $result['count'];
$total = $result['total'];

$more = ($count < $total) ? true : false;
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
?>
<div class="content-heading" dir="<?php echo $direction; ?>">
    <div class="app-content-inner">
        <ol class="content-breadcrumb breadcrumb breadcrumb-arrow">
            <li><a href="<?php echo $this->config->item('admin_url'); ?>"><i class="icon-home mr-1"></i> <?php echo $this->lang->line('label_home'); ?></a></li>
            <li class="active"><?php echo $this->lang->line('section_posts'); ?></li>
        </ol>
    </div>
</div>

<div class="app-content-inner" id="forsalepage">
    <div class="content-section">
        <div class="row">
            <div id="columns" data-columns> 
                <?php
                $post_id = 0;
                foreach ($posts as $postinfo) {
                    $post_id = $postinfo->post_id;
                    $type = $postinfo->type;
                    $html = '<div class="thumbnail">';

                    $html .= '<div class="thumbnail-heading panel-heading">';
                    $html .= '<div class="panel-tools">';
                    $html .= '<ul class="nav">';
                    $src = $postinfo->img;
                    $html .= '<li><a href="' . $src . '" target="_blank" class="text-muted"><i class="fa fa-download"></i></a></li>';
                    if ($postinfo->is_top) {
                        $html .= '<li><a style="cursor:pointer;" class="addtoppost text-muted text-info" csrf_token="' . $csrf['hash'] . '" pid="' . $postinfo->id . '" top="1"><i class="fa fa-bookmark"></i></a></li>';
                    } else {
                        $html .= '<li><a style="cursor:pointer;" class="addtoppost text-muted" csrf_token="' . $csrf['hash'] . '" pid="' . $postinfo->id . '" top="0"><i class="fa fa-bookmark"></i></a></li>';
                    }
                    $html.= '<li><a class="text-muted text-info"><i class="fa fa-shopping-cart"></i></a></li>';
                    $html .= '<li><a class="delmorepost text-muted" csrf_token="' . $csrf['hash'] . '" style="color:#969696;cursor:pointer;" pid="' . $postinfo->id . '"><i class="fa fa-times"></i></a></li>';
                    $html .= '</ul>';
                    $html .= '</div>';
                    $html .= '<h4 class="thumbnail-title">' . $postinfo->username . '</h4>';
                    $html .= '</div>';

                    if ($type === 'image') {
                        $html .= '<div><img src="' . $postinfo->img . '" alt="" style="width:100%"></div>';
                    }
                    $html .= '<div class="caption">';
                    $html .= '<h5>';
                    $html .= '<div><small><i class="fa fa-clock-o"></i> <span class="timeago" ts="' . $postinfo->created_ts . '">' . $postinfo->fulldate . '</span></small></div>';
                    $html .= '</h5>';
                    $html .= '<p>' . $postinfo->title . '</p>';
                    $html .= '<p>' . $postinfo->description . '</p>';
                    $html .= '<p>' . $postinfo->price . '</p>';
                    $html .= '<div>';
                    $html .= '<div class="thumbnail-extra">
                                <ul class="list-inline">
                                  <li><a class="text-muted"><i class="fa fa-eye"></i> ' . $postinfo->views . '</a></li>
                                  <li><a class="text-muted"><i class="fa fa-heart"></i> ' . $postinfo->likes . '</a></li>
                                  <li><a class="text-muted"><i class="fa fa-heartbeat"></i> ' . $postinfo->dislikes . '</a></li>
                                  <li><a class="text-muted"><i class="fa fa-comments"></i> ' . $postinfo->comments . '</a></li>
                                  <li><a class="text-muted"><i class="fa fa-list-alt"></i> ' . $postinfo->reports . '</a></li>
                                  <li><a class="text-muted"><i class="fa fa-download"></i> ' . $postinfo->downloads . '</a></li>
                                </ul>
                              </div>';
                    $html .= '</div>';
                    $html .= '</div>';

                    $html .= '</div>';
                    echo $html;
                }
                ?>
            </div>
        </div>
        <?php if ($more) { ?>
            <div class="text-center" style="margin:20px 0">
                <button csrf_token="<?php echo $csrf['hash']; ?>" type="button" class="btn btn-success" id="loadmoreforsale" more="1" post_id="<?php echo $post_id; ?>"><?php echo $this->lang->line('label_loadmore'); ?></button>
            </div>
        <?php } ?>
    </div>

</div>