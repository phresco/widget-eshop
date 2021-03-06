Event = YUI.event,
YUI.add("registerSuccessWidget", function(Y) {
    function RegisterSuccessWidget(config) {
        RegisterSuccessWidget.superclass.constructor.apply(this, arguments);
    }

    RegisterSuccessWidget.NAME = "registerSuccessWidget";

    RegisterSuccessWidget.ATTRS = {
        targetNode : {
            value : []
        }
    };

    Y.extend(RegisterSuccessWidget, Y.Phresco.PhrescoWidget, {
        initializer: function() {
            /*
             * initializer is part of the lifecycle introduced by 
             * the Base class. It is invoked during construction,
             * and can be used to setup instance specific state or publish events which
             * require special configuration (if they don't need custom configuration, 
             * events are published lazily only if there are subscribers).
             *
             * It does not need to invoke the superclass initializer. 
             * init() will call initializer() for all classes in the hierarchy.
             */

        },

        destructor : function() {
            /*
             * destructor is part of the lifecycle introduced by 
             * the Widget class. It is invoked during destruction,
             * and can be used to cleanup instance specific state.
             *
             * Anything under the boundingBox will be cleaned up by the Widget base class
             * We only need to clean up nodes/events attached outside of the bounding Box
             *
             * It does not need to invoke the superclass destructor. 
             * destroy() will call initializer() for all classes in the hierarchy.
             */
        },

        render : function() {
            /*
             * render is part of the lifecycle introduced by the
             * Widget class. Widget's renderer method invokes:
             *
             *     render()
             *     bind()
             *     sync()
             *
             * render is intended to be used by the Widget subclass
             * to create or insert new elements into the DOM. 
             */       
            var jsonData = this.get("newproducts");
            this.createContent(this.getTargetNode());
        },
        

        bind : function() {
            /*
             * bind is intended to be used by the Widget subclass 
             * to bind any event listeners which will drive the Widget UI.
             * 
             * It will generally bind event listeners for attribute change
             * events, to update the state of the rendered UI in response 
             * to attribute value changes, and also attach any DOM events,
             * to activate the UI.
             */
            $(document).ready(function(){
                var myScroll = new iScroll('scroller');
                document.addEventListener('touchmove', function (e) { 
					e.preventDefault(); }, false);
                document.addEventListener('DOMContentLoaded', myScroll, false);
            });
        },

        sync : function() {
            /*
             * sync is intended to be used by the Widget subclass to
             * update the UI to reflect the initial state of the widget,
             * after render. From there, the event listeners we bound above
             * will take over.
             */

        },

        captureData : function(jsonData) {
            this.createContent(this.getTargetNode(), jsonData);
            var target = this.get("targetNode");
            $(target).unmask();
        },

        createContent : function(targetNode, jsonData) {
            targetNode.empty();

            var apiRef = this.get("apiReference");
            var url = apiRef.get("wsURLWithoutContext");
            var config = apiRef._getConfigData();
            //var webImage = config.web.web;
            
            var userId = 0;
            if(apiRef.get("userId")){
                userId = apiRef.get("userId");
            }

            var contactus = this.createElement('<div id="maincontact">');
            var selection = this.createElement('<section id="contact">');
            var divleft = this.createElement('<div id="">');
            var contactdescrip = this.createElement('<div class="contactdescrip">');
            
            var myCart = this.createElement('<div class="mycart_div"></div>');
                var log_div = this.createElement('<div class="log_div"></div>');
                    var log_innerdiv = this.createElement('<div class="log_innerdiv"></div>');
                        var log_innerdiv1 = this.createElement('<div class="log_innerdiv1"></div>');
                            var log_heading = this.createElement('<div class="log_heading">Register</div>');
                            var log_txt_div = this.createElement('<div class="log_txt_div"></div>');
                                
                                var registrationStatus = this.createElement('<div class="log_txt"></div>');
                                    var statusMsg = this.createElement('<div class="log_txt_lft">Registration Status : '+jsonData.response.successMessage+'</div>');
                                    registrationStatus.appendChild(statusMsg);

                                var userStatus = this.createElement('<div class="log_txt"></div>');
                                    var userstatusMsg = this.createElement('<div class="log_txt_lft">User Status : '+jsonData.response.message+'  </div>');
                                    userStatus.appendChild(userstatusMsg);

                                var log_txtfname = this.createElement('<div class="log_txt">');
                                    var log_txt_lftfname = this.createElement('<div class="log_txt_lft">Name : </div>');
                                    var log_txt_rhtfname = this.createElement('<div class="log_txt_lft">'+jsonData.register.firstName+' '+jsonData.register.lastName+'</div>');
                                log_txtfname.appendChild(log_txt_lftfname);
                                log_txtfname.appendChild(log_txt_rhtfname);
                               
                                var log_txtEmail = this.createElement('<div class="log_txt">');
                                    var log_txt_lftEmail = this.createElement('<div class="log_txt_lft">Email : </div>');
                                    var log_txt_rhtEmail = this.createElement('<div class="log_txt_lft">'+jsonData.register.email+'</div>');
                                log_txtEmail.appendChild(log_txt_lftEmail);
                                log_txtEmail.appendChild(log_txt_rhtEmail);
                           
                            log_txt_div.appendChild(registrationStatus);
                            log_txt_div.appendChild(userStatus);
                            log_txt_div.appendChild(log_txtfname);
                            log_txt_div.appendChild(log_txtEmail);
 
                        log_innerdiv1.appendChild(log_heading);
                        log_innerdiv1.appendChild(log_txt_div);

                    log_innerdiv.appendChild(log_innerdiv1);
                log_div.appendChild(log_innerdiv);
            myCart.appendChild(log_div);
            contactdescrip.appendChild(myCart);
            var cleardiv = this.createElement('<div class="clear"></div>');     
            
            divleft.appendChild(contactdescrip);    
            divleft.appendChild(cleardiv);
            selection.appendChild(divleft);
            contactus.appendChild(selection);
            targetNode.appendChild(contactus);  
           
            if ($('#container').is(":visible")) {
                    this.renderWidgets();
                }
        },
        onUpdateListener: function(jsonData) {
            this.captureData(jsonData);
        },
        
    });

    Y.namespace("Phresco").RegisterSuccessWidget = RegisterSuccessWidget;
}, "3.3.0", {
    requires:["widget", "node", "substitute", "phrescoWidget"]
});
