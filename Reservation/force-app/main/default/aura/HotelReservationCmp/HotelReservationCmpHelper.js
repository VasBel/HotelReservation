({
	getColumnAndAction : function(component, event, helper) {
        var actions = [
            { label: 'Delete', name: 'delete' }
        ];
        component.set('v.columns', [
            {label: 'City', fieldName: 'City__c', type: 'text', sortable:true },
            {label: 'Room', fieldName: 'Name', type: 'text', sortable:true },
            {label: 'Check-in', fieldName: 'Check_in__c', type: 'date', typeAttributes: {
    																					day: 'numeric',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                        second: '2-digit',
                                                                                        hour12: true
  																						},
             sortable:true},
            {label: 'Check-out', fieldName: 'Check_out__c', type: 'date',typeAttributes: {
    																					day: 'numeric',
                                                                                        month: 'short',
                                                                                        year: 'numeric',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit',
                                                                                        second: '2-digit',
                                                                                        hour12: true
  																						},
             sortable:true},
            {label: 'Additional', fieldName: 'Additional__c', type: 'text',sortable:true},
            {label: 'Count of Guests', fieldName: 'CountOfGuests__c', type: 'text',sortable:true},
            { type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
    },
            
        getRes: function(component, event, helper) {
        var action = component.get('c.fetchRes');
        	action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
             
                component.set("v.mydata", resultData);
            }
        });
        $A.enqueueAction(action);
        
    }, 
    
   
    deleteResHlp: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        var action = component.get("c.deleteDetails");
        action.setParams({
            "regForm1": row
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS" ) {
                var rows = component.get('v.mydata');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                component.set('v.mydata', rows);
                
            }
        });
        $A.enqueueAction(action);
    },
    
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.mydata");
        var reverse = sortDirection !== 'asc';

        data = Object.assign([],
            data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
        );
        cmp.set("v.mydata", data);
    },
    
    sortBy: function (field, reverse, primer) {
        var key = primer
        ? function(x) {
			return primer(x[field]);
		}
        : function(x) {
			 return x[field];
		};
        	 return function (a, b) {
             var A = key(a); 
 			 var B = key(b);
             return reverse * ((A > B) - (B > A));
        };
    },  
})