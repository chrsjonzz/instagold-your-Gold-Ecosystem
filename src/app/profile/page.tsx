'use client';

import AuthGuard from "@/components/AuthGuard";
import { useUser } from "@/firebase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const { user, loading } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        const auth = getAuth();
        await auth.signOut();
        router.push('/');
    };

    const getInitials = (name: string | null | undefined) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }

    if (loading || !user) {
        // AuthGuard will handle redirection, but we can show a loader here.
        // Or return null as AuthGuard will be displaying its own loader.
        return null;
    }

    return (
        <AuthGuard>
            <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
                <div className="container mx-auto px-4 py-24 md:py-32">
                    <div className="max-w-2xl mx-auto">
                        <Card className="shadow-lg border-primary/20">
                            <CardHeader className="text-center">
                                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                                    <AvatarFallback className="text-3xl bg-primary/20 text-primary font-bold">
                                        {getInitials(user.displayName)}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-headline text-3xl text-primary">{user.displayName || 'Welcome!'}</CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">
                                    This is your personal profile page. More features coming soon!
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}

export default ProfilePage;
