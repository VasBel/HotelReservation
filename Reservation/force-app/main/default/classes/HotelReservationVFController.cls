public class HotelReservationVFController {
 Reservation__c t;
    ApexPages.StandardController controller;
    public HotelReservationVFController(ApexPages.StandardController controller) {
        this.controller = controller;
        t = (Reservation__c) Controller.getRecord();
        
        
    }
    
    
    public list<SelectOption> getRecordTypes() {
        list<SelectOption> options = new list<SelectOption>();
        for (list<RecordType> rts : [SELECT ID, name FROM RecordType WHERE SObjectType = 'Reservation__c' ORDER BY name]) {
            for (RecordType rt : rts) {
                options.add(new SelectOption(rt.ID, rt.Name));
            } 
        }
        
        return options;
    }
    
    
    public Reservation__c Reserv {get;set;} 
    
     
}