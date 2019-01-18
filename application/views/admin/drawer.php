<?php
defined('BASEPATH') OR exit('No direct script access allowed');
$segment = $this->uri->segment(2, NULL);
$segment3 = $this->uri->segment(3, NULL);
$adminlang = $this->session->userdata(SESSION_LANG);
$direction = $adminlang['dir'];
$align_text = ($direction === 'rtl') ? "text-right" : "text-left";
$stacked_left = ($direction === 'rtl') ? " stacked-menu-has-left" : "";
$requestcount = $this->AdminModel->getRequestsCount();
?>
<div id="app-drawer" class="drawerjs drawerjs-has-bottom-nav">
    <!-- .drawer-inner -->
    <div class="drawerjs-inner">
        <!-- #drawer-menu -->
        <div id="drawer-menu" class="stacked-menu<?php echo $stacked_left; ?>">
            <!-- .menu -->
            <ul class="menu">
                <li class="menu-header">
                </li>
                <!-- /.menu-header -->
                <li class="menu-item<?php echo (is_null($segment) ? ' has-active' : ''); ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>" class="menu-link">
                        <i class="menu-icon icon-speedometer"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_home'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'requests') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>requests" class="menu-link">
                        <i class="menu-icon icon-screen-tablet"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_requests'); ?></span>
                        <?php if($requestcount){?>
                        <span class="badge badge-warning"><?php echo $requestcount;?></span>
                        <?php }?>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'support') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>support" class="menu-link">
                        <i class="menu-icon icon-support" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_support'); ?></span>
                    </a>
                </li>
                <li class="menu-item has-child <?php echo ($segment === 'posts') ? ' has-active' : ''; ?>">
                    <a href="#" class="menu-link">
                        <i class="menu-icon icon-docs"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_posts'); ?></span>
                    </a>
                    <!-- child menu -->
                    <ul class="menu">
                        <li class="menu-subhead">Posts</li>
                        <li class="menu-item<?php echo ($segment === 'posts' && !$segment3) ? ' has-active' : ''; ?>">
                            <a href="<?php echo $this->config->item('admin_url'); ?>posts" class="menu-link">
                                <i class="menu-icon icon-docs" aria-hidden="true"></i>
                                <span class="menu-text"><?php echo $this->lang->line('section_posts_all'); ?></span>
                            </a>
                        </li>
                        <li class="menu-item<?php echo ($segment === 'posts' && $segment3 === 'top') ? ' has-active' : ''; ?>">
                            <a href="<?php echo $this->config->item('admin_url'); ?>posts/top" class="menu-link">
                                <i class="menu-icon icon-arrow-up-circle" aria-hidden="true"></i>
                                <span class="menu-text"><?php echo $this->lang->line('section_posts_top'); ?></span>
                            </a>
                        </li>
                        <li class="menu-item<?php echo ($segment === 'posts' && $segment3 === 'mostviewed') ? ' has-active' : ''; ?>">
                            <a href="<?php echo $this->config->item('admin_url'); ?>posts/mostviewed" class="menu-link">
                                <i class="menu-icon icon-trophy" aria-hidden="true"></i>
                                <span class="menu-text"><?php echo $this->lang->line('section_posts_mostviewed'); ?></span>
                            </a>
                        </li>
                        <li class="menu-item<?php echo ($segment === 'posts' && $segment3 === 'forsale') ? ' has-active' : ''; ?>">
                            <a href="<?php echo $this->config->item('admin_url'); ?>posts/forsale" class="menu-link">
                                <i class="menu-icon icon-wallet" aria-hidden="true"></i>
                                <span class="menu-text"><?php echo $this->lang->line('section_posts_forsale'); ?></span>
                            </a>
                        </li>
                    </ul>
                    <!-- /child menu -->
                </li>
                <li class="menu-item<?php echo ($segment === 'banners') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>banners" class="menu-link">
                        <i class="menu-icon icon-picture" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_banners'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'reports') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>reports" class="menu-link">
                        <i class="menu-icon icon-notebook" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_reports'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'users') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>users" class="menu-link">
                        <i class="menu-icon icon-user" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_users'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'messages') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>messages" class="menu-link">
                        <i class="menu-icon icon-speech" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_messages'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'sendnotifications') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>sendnotifications" class="menu-link">
                        <i class="menu-icon icon-bell" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_sendnotification'); ?></span>
                    </a>
                </li>
                <li class="menu-item<?php echo ($segment === 'sendmessages') ? ' has-active' : ''; ?>">
                    <a href="<?php echo $this->config->item('admin_url'); ?>sendmessages" class="menu-link">
                        <i class="menu-icon icon-envelope" aria-hidden="true"></i>
                        <span class="menu-text"><?php echo $this->lang->line('section_sendmessages'); ?></span>
                    </a>
                </li>

                <!-- /.menu-item -->
            </ul>
            <!-- /.menu -->
        </div>
        <!-- /#drawer-menu -->
    </div>
    <!-- /.drawer-inner -->
    <!-- compact toggler -->
    <ul class="nav drawerjs-nav drawerjs-nav-bottom nav-right">
        <li class="nav-item">
            <a href="#" data-toggle="drawer-compact">
                <span class="sr-only">Toggle Compact Drawer</span>
                <span class="icon-toggle-compact"></span>
            </a>
        </li>
    </ul>
    <!-- /compact toggler -->
</div>