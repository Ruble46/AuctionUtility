using Microsoft.AspNetCore.Identity;

public class AppRole : IdentityRole
{
    public AppRole() : base() { }
    public AppRole(string name) : base(name) { }
    // extra properties here 
}