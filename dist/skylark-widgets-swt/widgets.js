/**
 * skylark-widgets-swt - The skylark widget framework and standard widgets
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-widgets/skylark-widgets-swt/
 * @license MIT
 */
define(["skylark-langx/langx"],function(e){var t,n={},r=e.Evented.inherit({klassName:"VendorFactory",vendorName:null,_types:null,init:function(e){this.vendorName=e,this._types={}},add:function(e,t){this._types[e.toLowerCase()]=t},get:function(e){return this._types[e.toLowerCase()]},has:function(e){return!!this._types[e.toLowerCase()]},create:function(e,t,n){var r;if("string"==typeof e?(t=t||{}).type=e:(t,e=(t=e).type),e=e.toLowerCase(),!(r=this._types[e]))throw new Error("Could not find control by type: "+e);return new r(t)}});return t=n.swt=new r("swt"),{register:function(e){if(e=e.toLowerCase(),n[e])throw new Error("The vendor is been existed:"+e);return n[e]=new r(e)},getFactory:function(e){return e?(e=e.toLowerCase(),n[e]):t},create:function(e,t,n){"string"==typeof e?(t=t||{}).type=e:(n=t,e=(t=e).type);var r=(e=e.toLowerCase()).split("@"),o=r[1],s=this.get(o);return e=r[0],s.create(e,t,n)}}});
//# sourceMappingURL=sourcemaps/widgets.js.map
