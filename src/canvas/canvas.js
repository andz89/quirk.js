 
import { Menu_tools } from "./_menu-tools";
import { Global } from "./_global";
import { Utilities } from "./_utilities";
export class Canvas extends Global {
  create_main_canvas = () => {
 

    let utils = new Utilities({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
    });

    utils.canvasOn();
    utils.mirror_movement();
    utils.canvas_option();
    // utils.paste_text()
 

    let menu_tools = new Menu_tools({
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
    });

    menu_tools.deleteObjects();
    menu_tools.print_view();

    menu_tools.upload_user_image()
    menu_tools.loadPage();
    menu_tools.insertText();
    menu_tools.add_background()
    menu_tools.save_file_json();
    menu_tools.resetCanvas();
    menu_tools.insert_textbox();
    menu_tools.generate_certificate();
    menu_tools.download_as_Zip();
    menu_tools.insertData();
    menu_tools.fontSize();
    menu_tools.fontColor();
    menu_tools.bold_text();
    menu_tools.italic_text();
    menu_tools.textAlign_left();
    menu_tools.textAlign_center();
    menu_tools.textAlign_right();
    menu_tools.fontStyle();
    menu_tools.grid();
    if(user_role == 'admin'){
      menu_tools.admin();
      menu_tools.align_canvas();
      menu_tools.align_left();
      menu_tools.align_center();
      menu_tools.align_right();
      menu_tools.align_top();
      menu_tools.align_middle();
      menu_tools.align_bottom();
      menu_tools.object_name();
      menu_tools. lock();
      menu_tools.group_objects()
      menu_tools.ungroup_objects()
      document.querySelector('.admin-tool-container').style.display = 'flex'
    }
  
  };
}
