import { Right_tools } from "./_right-tools.js";
import { Menu_tools } from "./_menu-tools.js";
import { Modification } from "./_modification.js";
import { Utilities } from "./_utilities.js";
export class Canvas extends Modification {
  create_main_canvas = () => {
    this.canvas.state = [];

    let utils = new Utilities({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
    });

    utils.deleteObjects();
    utils.canvasOn();
    utils.discardActiveObject();
    utils.arrowMovement();

    utils.alignCanvasBtn();
    utils.filesBtn();
    utils.files_modal_button(".insert-shape");

    let menu_tools = new Menu_tools({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
    });
    menu_tools.loadPage();
    menu_tools.insertText(".dropbtn-insert-text");
    menu_tools.uploadImageLocalFile("#upload_image");
    menu_tools.save_file_json();
    menu_tools.canvasBackgroundColor();
    menu_tools.bringToFront_object();
    menu_tools.bringToBack_object();
    menu_tools.horizontal_object();
    menu_tools.vertical_object();
    menu_tools.center_object();
    menu_tools.align_left();
    menu_tools.align_center();
    menu_tools.align_right();
    menu_tools.align_top();
    menu_tools.align_middle();
    menu_tools.align_bottom();
    menu_tools.dragAndDrop_image();
    menu_tools.insert_textbox();
    // menu_tools.paste_image();
    menu_tools.preview_image();
    menu_tools.download_as_Zip();
    // menu_tools.print();
    menu_tools.insertData();
    menu_tools.trim();

    menu_tools.upload_and_clip();

    // shapes
    menu_tools.insert_square();
    menu_tools.insert_circle();

    let right_tools = new Right_tools({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
    });
    right_tools.fontSize("#fontSize");
    right_tools.backgroundColor();
    right_tools.remove_fill_color();
    right_tools.fontColor("#color");
    right_tools.bold_text();
    right_tools.italic_text();
    right_tools.stroke_color();
    right_tools.stroke_width();
    // right_tools.opacity()
    right_tools.duplicate();
    right_tools.sentenceCase();
    right_tools.group_objects();
    right_tools.ungroup_objects();
    right_tools.textAlign_left();
    right_tools.textAlign_center();
    right_tools.textAlign_right();
    right_tools.fontStyle();
  };
}
