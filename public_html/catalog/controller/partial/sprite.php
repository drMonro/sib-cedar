<?php
// *	@source		See SOURCE.txt for source and other copyright.
// *	@license	GNU General Public License version 3; see LICENSE.txt

class ControllerPartialSprite extends Controller {
    public function index() {
        return $this->load->view('partial/sprite_full');
    }
}
