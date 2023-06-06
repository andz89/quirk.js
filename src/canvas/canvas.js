import { Menu_tools } from "./_menu-tools";
import { Global } from "./_global";
import { Utilities } from "./_utilities";
import { Tools } from "./admin_tools";
export class Canvas extends Global {
  create_main_canvas = () => {
    let properties = {
      canvas: this.canvas,
      width: this.width,
      height: this.height,
      canvasScale: this.canvasScale,
      SCALE_FACTOR: this.SCALE_FACTOR,
      fileHandle: this.fileHandle,
      user_role: this.user_role,
      table: this.table,
      list: this.list,
      purchased_id: this.purchased_id,
      template_id: this.template_id,
      mode: this.mode,
      category: this.category,
    };
    let utils = new Utilities(properties);

    utils.canvasOn();
    utils.mirror_movement();
    let menu_tools = new Menu_tools(properties);
    menu_tools.superScript();
    menu_tools.deleteObjects();
    menu_tools.print_view();

    menu_tools.upload_user_image();

    menu_tools.insertText();
    menu_tools.add_background();
    menu_tools.send_to_server();
    menu_tools.resetCanvas();
    menu_tools.insert_textbox();
    menu_tools.generate_certificate();
    menu_tools.download_as_Zip();
    menu_tools.insertData();
    menu_tools.fontSize();
    menu_tools.fontColor();
    menu_tools.fontProperties();
    menu_tools.keyboard_shortcut();
    menu_tools.textAlign();

    menu_tools.fontStyle();
    menu_tools.grid();
    menu_tools.context_menu();
    if (this.user_role == "admin") {
      let tools = new Tools();
      tools.admin_tools(this.canvas);
    }
  };
}
