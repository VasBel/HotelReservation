public class HotelReservationController {
 @AuraEnabled
    public static List<Reservation__c> fetchRes (){
        return [SELECT Id, Name,RecordType.Name, Check_out__c, CountOfGuests__c, Additional__c, City__c, Check_in__c FROM Reservation__c order by CreatedDate ];
    }
     
    @AuraEnabled
    public static void deleteDetails (Reservation__c regForm1){
         delete regForm1;
    } 
}