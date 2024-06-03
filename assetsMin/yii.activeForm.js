!function(f){f.fn.yiiActiveForm=function(t){return l[t]?l[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?(f.error("Method "+t+" does not exist on jQuery.yiiActiveForm"),!1):l.init.apply(this,arguments)};function m(t){a&&(a.resolve(),a=void 0,t.removeData("yiiSubmitFinalizePromise"))}var a,i="beforeValidate",g="afterValidate",d="beforeValidateAttribute",u="afterValidateAttribute",n="beforeSubmit",c="ajaxBeforeSend",v="ajaxComplete",r="afterInit",s={encodeErrorSummary:!0,errorSummary:".error-summary",validateOnSubmit:!0,errorCssClass:"has-error",successCssClass:"has-success",validatingCssClass:"validating",ajaxParam:"ajax",ajaxDataType:"json",validationUrl:void 0,scrollToError:!0,scrollToErrorOffset:0,validationStateOn:"container"},o={id:void 0,name:void 0,container:void 0,input:void 0,error:".help-block",encodeError:!0,validateOnChange:!0,validateOnBlur:!0,validateOnType:!1,validationDelay:500,enableAjaxValidation:!1,validate:void 0,status:0,cancelled:!1,value:void 0,updateAriaInvalid:!0},l={init:function(e,a){return this.each(function(){var t,i=f(this);i.data("yiiActiveForm")||(void 0===(t=f.extend({},s,a||{})).validationUrl&&(t.validationUrl=i.attr("action")),f.each(e,function(t){e[t]=f.extend({value:E(i,this)},o,this),h(i,e[t])}),i.data("yiiActiveForm",{settings:t,attributes:e,submitting:!1,validated:!1,validate_only:!1,options:j(i)}),i.on("reset.yiiActiveForm",l.resetForm),t.validateOnSubmit&&(i.on("mouseup.yiiActiveForm keyup.yiiActiveForm",":submit",function(){i.data("yiiActiveForm").submitObject=f(this)}),i.on("submit.yiiActiveForm",l.submitForm)),t=f.Event(r),i.trigger(t))})},add:function(t){var i=f(this);t=f.extend({value:E(i,t)},o,t),i.data("yiiActiveForm").attributes.push(t),h(i,t)},remove:function(i){var t=f(this),e=t.data("yiiActiveForm").attributes,a=-1,n=void 0;return f.each(e,function(t){if(e[t].id==i)return n=e[a=t],!1}),0<=a&&(e.splice(a,1),y(t,n)),n},validateAttribute:function(t){t=l.find.call(this,t);null!=t&&b(f(this),t,!0)},find:function(i){var e=f(this).data("yiiActiveForm").attributes,a=void 0;return f.each(e,function(t){if(e[t].id==i)return a=e[t],!1}),a},destroy:function(){return this.each(function(){f(this).off(".yiiActiveForm"),f(this).removeData("yiiActiveForm")})},data:function(){return this.data("yiiActiveForm")},validate:function(t){t&&(f(this).data("yiiActiveForm").submitting=!0);var r=f(this),s=r.data("yiiActiveForm"),o=!1,u={},l=C(),a=s.submitting;if(a){t=f.Event(i);if(r.trigger(t,[u,l]),!1===t.result)return s.submitting=!1,void m(r)}f.each(s.attributes,function(){this.$form=r;var t=D(r,this);if(t.toArray().reduce(function(t,i){return t&&f(i).is(":disabled")},!0))return!0;if(t.length&&"select"===t[0].tagName.toLowerCase()){var i=t[0].options,e=!i||!i.length,a=t.attr("required"),n=t.attr("multiple"),t=t.attr("size")||1;if(a&&!n&&1===parseInt(t,10)){if(e)return!0;if(i[0]&&""!==i[0].value&&""!==i[0].text)return!0}}this.cancelled=!1,!s.submitting&&2!==this.status&&3!==this.status||(void 0===(a=u[this.id])&&(u[this.id]=a=[]),n=f.Event(d),r.trigger(n,[this,a,l]),!1!==n.result?(this.validate&&this.validate(this,E(r,this),a,l,r),this.enableAjaxValidation&&(o=!0)):this.cancelled=!0)}),f.when.apply(this,l).always(function(){for(var t in u)0===u[t].length&&delete u[t];var i,e;o&&(f.isEmptyObject(u)||s.submitting)?(i=s.submitObject,e="&"+s.settings.ajaxParam+"="+r.attr("id"),i&&i.length&&i.attr("name")&&(e+="&"+i.attr("name")+"="+i.attr("value")),f.ajax({url:s.settings.validationUrl,type:r.attr("method"),data:r.serialize()+e,dataType:s.settings.ajaxDataType,complete:function(t,i){V=null,r.trigger(v,[t,i])},beforeSend:function(t,i){V=t,r.trigger(c,[t,i])},success:function(t){null!==t&&"object"==typeof t?(f.each(s.attributes,function(){this.enableAjaxValidation&&!this.cancelled||delete t[this.id]}),O(r,f.extend(u,t),a)):O(r,u,a)},error:function(){s.submitting=!1,m(r)}})):s.submitting?window.setTimeout(function(){O(r,u,a)},200):O(r,u,a)})},submitForm:function(){var t,i=f(this),e=i.data("yiiActiveForm");return e.validated?(e.submitting=!1,t=f.Event(n),i.trigger(t),!1===t.result?(e.validated=!1,m(i),!1):(w(i),!0)):(t=i,a=f.Deferred(),t.data("yiiSubmitFinalizePromise",a.promise()),void 0!==e.settings.timer&&clearTimeout(e.settings.timer),e.submitting=!0,l.validate.call(i),!1)},resetForm:function(){var e=f(this),a=e.data("yiiActiveForm");window.setTimeout(function(){f.each(a.attributes,function(){this.value=E(e,this),this.status=0;var t=e.find(this.container),i=D(e,this);("input"===a.settings.validationStateOn?i:t).removeClass(a.settings.validatingCssClass+" "+a.settings.errorCssClass+" "+a.settings.successCssClass),t.find(this.error).html("")}),e.find(a.settings.errorSummary).hide().find("ul").html("")},1)},updateMessages:function(t,i){var e=f(this),a=e.data("yiiActiveForm");f.each(a.attributes,function(){x(e,this,t)}),i&&S(e,t)},updateAttribute:function(t,i){var e,a=l.find.call(this,t);null!=a&&((e={})[t]=i,x(f(this),a,e))}},h=function(i,e){var t=D(i,e);e.validateOnChange&&t.on("change.yiiActiveForm",function(){b(i,e,!1)}),e.validateOnBlur&&t.on("blur.yiiActiveForm",function(){0!=e.status&&1!=e.status||b(i,e,!0)}),e.validateOnType&&t.on("keyup.yiiActiveForm",function(t){-1===f.inArray(t.which,[16,17,18,37,38,39,40])&&e.value!==E(i,e)&&b(i,e,!1,e.validationDelay)})},y=function(t,i){D(t,i).off(".yiiActiveForm")},b=function(e,t,i,a){var n=e.data("yiiActiveForm");i&&(t.status=2),f.each(n.attributes,function(){p(this.value,E(e,this))||(this.status=2,i=!0)}),i&&(null!==V&&V.abort(),void 0!==n.settings.timer&&clearTimeout(n.settings.timer),n.settings.timer=window.setTimeout(function(){n.submitting||e.is(":hidden")||(f.each(n.attributes,function(){var t,i;2===this.status&&(this.status=3,t=e.find(this.container),i=D(e,this),("input"===n.settings.validationStateOn?i:t).addClass(n.settings.validatingCssClass))}),l.validate.call(e))},a||200))},p=function(t,i){return t instanceof Object?e(t,i):Array.isArray(t)?A(t,i):t===i},e=function(t,i){if(!(t instanceof Object&&i instanceof Object))return!1;var e=Object.keys(t),a=Object.keys(i);if(e.length!==a.length)return!1;for(var n=0;n<e.length;n+=1){if(!i.hasOwnProperty(e[n]))return!1;if(t[e[n]]!==i[e[n]])return!1}return!0},A=function(t,i){if(!Array.isArray(t)||!Array.isArray(i))return!1;if(t.length!==i.length)return!1;for(var e=0;e<t.length;e+=1)if(t[e]!==i[e])return!1;return!0},C=function(){var t=[];return t.add=function(t){this.push(new f.Deferred(t))},t},F=["action","target","method","enctype"],j=function(t){for(var i={},e=0;e<F.length;e++)i[F[e]]=t.attr(F[e]);return i},O=function(i,e,a){var t=i.data("yiiActiveForm");if(void 0===t)return!1;var n,r,s=[];if(f.each(t.attributes,function(){var t=a&&x(i,this,e)||!a&&T(i,this,e);D(i,this).is(":disabled")||this.cancelled||!t||s.push(this)}),i.trigger(g,[e,s]),a){if(S(i,e),s.length)t.settings.scrollToError&&(r=f(document).height(),(n=(n=i.find(f.map(s,function(t){return t.input}).join(",")).first().closest(":visible").offset().top-t.settings.scrollToErrorOffset)<0?0:r<n?r:n)<(r=f(window).scrollTop())||n>r+f(window).height())&&f(window).scrollTop(n),t.submitting=!1;else if(t.validated=!0,!t.validate_only){if(t.submitObject)for(var o=i,u=t.submitObject,l=0;l<F.length;l++){var d=u.attr("form"+F[l]);d&&o.attr(F[l],d)}if(i.submit(),t.submitObject)for(var c=i,v=c.data("yiiActiveForm"),h=0;h<F.length;h++)c.attr(F[h],v.options[F[h]]||null)}}else f.each(t.attributes,function(){this.cancelled||2!==this.status&&3!==this.status||x(i,this,e)});m(i)},w=function(t){var i,e=t.data("yiiActiveForm").submitObject||t.find(":submit:first");e.length&&"submit"==e.attr("type")&&e.attr("name")&&((i=f('input[type="hidden"][name="'+e.attr("name")+'"]',t)).length?i.attr("value",e.attr("value")):f("<input>").attr({type:"hidden",name:e.attr("name"),value:e.attr("value")}).appendTo(t))},x=function(t,i,e){var a,n,r=t.data("yiiActiveForm"),s=D(t,i),o=T(t,i,e);return f.isArray(e[i.id])||(e[i.id]=[]),i.status=1,s.length&&(n=(a=t.find(i.container)).find(i.error),k(t,i,o),s="input"===r.settings.validationStateOn?s:a,o?(i.encodeError?n.text(e[i.id][0]):n.html(e[i.id][0]),s.removeClass(r.settings.validatingCssClass+" "+r.settings.successCssClass).addClass(r.settings.errorCssClass)):(n.empty(),s.removeClass(r.settings.validatingCssClass+" "+r.settings.errorCssClass+" ").addClass(r.settings.successCssClass)),i.value=E(t,i)),t.trigger(u,[i,e[i.id]]),o},T=function(t,i,e){var t=D(t,i),a=!1;return f.isArray(e[i.id])||(e[i.id]=[]),a=t.length?0<e[i.id].length:a},S=function(t,i){var e=t.data("yiiActiveForm"),t=t.find(e.settings.errorSummary),a=t.find("ul").empty();t.length&&i&&(f.each(e.attributes,function(){var t;f.isArray(i[this.id])&&i[this.id].length&&(t=f("<li/>"),e.settings.encodeErrorSummary?t.text(i[this.id][0]):t.html(i[this.id][0]),a.append(t))}),t.toggle(0<a.find("li").length))},E=function(t,i){var e,a,i=D(t,i),n=i.attr("type");return"checkbox"===n||"radio"===n?1<(e=i.filter(":checked")).length?(a=[],e.each(function(t){a.push(f(e.get(t)).val())}),a):(e=e.length?e:t.find('input[type=hidden][name="'+i.attr("name")+'"]')).val():i.val()},D=function(t,i){t=t.find(i.input);return t.length&&"div"===t[0].tagName.toLowerCase()?t.find("input"):t},k=function(t,i,e){i.updateAriaInvalid&&t.find(i.input).attr("aria-invalid",e?"true":"false")},V=null}(window.jQuery);
//# sourceMappingURL=yii.activeForm.js.map
