({
 doinit : function(component, event, helper) {
        helper.getRes(component, event);
        
        helper.getColumnAndAction(component, event);
        
    },
  
    deleteRes: function (component, event, helper) {
        var action = event.getParam('action');    
        switch (action.name) {
            case 'delete':
                helper.deleteResHlp(component,event);
                break;
        }    
    },

   	updateColumnSorting: function (cmp, event, helper) {
        cmp.set('v.isLoading', true);
        setTimeout($A.getCallback(function() {
            var fieldName = event.getParam('fieldName');
            var sortDirection = event.getParam('sortDirection');
            cmp.set("v.sortedBy", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
            helper.sortData(cmp, fieldName, sortDirection);
        }), 0);
    },
    
    
    
    
    
    
    
    

})