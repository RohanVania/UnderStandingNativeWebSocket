import NamespaceClass from "../class/NamespaceClass.js"
import RoomClass from "../class/RoomClass.js"

const namespace1=new NamespaceClass(0,"https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png","/wiki")
const namespace2=new NamespaceClass(1,"https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png","/mozilla")
const namespace3=new NamespaceClass(2,"https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png","/linux")


namespace1.addRoom(new RoomClass(0,'New Articles',0,true));
namespace1.addRoom(new RoomClass(1,'Editors',0));
namespace1.addRoom(new RoomClass(2,'Other',0));

namespace2.addRoom(new RoomClass(0,'Firefox',1))
namespace2.addRoom(new RoomClass(1,'SeaMonkey',1))
namespace2.addRoom(new RoomClass(2,'SpiderMonkey',1))
namespace2.addRoom(new RoomClass(3,'Rust',1))

namespace3.addRoom(new RoomClass(0,'Debian',2))
namespace3.addRoom(new RoomClass(1,'Red Hat',2))
namespace3.addRoom(new RoomClass(2,'Ubuntu',2))
namespace3.addRoom(new RoomClass(3,'Mac Os',2))




export const namespacesArray=[namespace1,namespace2,namespace3]

