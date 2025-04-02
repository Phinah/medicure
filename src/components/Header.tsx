
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { LogOut, User, Settings } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'patient':
        return '/patient';
      case 'doctor':
        return '/doctor';
      case 'hospital':
        return '/hospital';
      case 'caretaker':
        return '/caretaker';
      default:
        return '/';
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="med-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-medblue-600">Medi-Cure</span>
          </Link>
          
          {user && (
            <nav className="hidden md:flex gap-6 ml-6">
              <Link to={getDashboardLink()} className="text-sm font-medium hover:text-medblue-500 transition-colors">
                Dashboard
              </Link>
              {user.role === 'patient' && (
                <>
                  <Link to="/appointments" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Appointments
                  </Link>
                  <Link to="/medications" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Medications
                  </Link>
                  <Link to="/surveys" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Health Surveys
                  </Link>
                </>
              )}
              {user.role === 'doctor' && (
                <>
                  <Link to="/patients" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Patients
                  </Link>
                  <Link to="/appointments" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Appointments
                  </Link>
                </>
              )}
              {user.role === 'hospital' && (
                <>
                  <Link to="/doctors" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Doctors
                  </Link>
                  <Link to="/patients" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                    Patients
                  </Link>
                </>
              )}
              {user.role === 'caretaker' && (
                <Link to="/patients" className="text-sm font-medium hover:text-medblue-500 transition-colors">
                  Patients
                </Link>
              )}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-medblue-100 text-medblue-700">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
