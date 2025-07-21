import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function AlertDialogDemo() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className={`space-y-4`}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Email chưa được xác thực</AlertDialogTitle>
                    <AlertDialogDescription>
                        Vui lòng xác thực email trước khi đăng ký tài khoản !
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter style={{display: "flex", justifyContent:"end !important"}}>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
