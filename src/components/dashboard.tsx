import { type PropsWithChildren } from "beth-stack/jsx";


export function Dashboard({ children }: PropsWithChildren) {
    return (
        <div class="flex h-screen w-full flex-col md:flex-row">
            <nav class="flex h-full min-w-[18rem] flex-col bg-gray-800 p-5 text-white">
                <h1 class="text-4xl mb-4">Dashboard</h1>
                <ul class="flex-grow space-y-6">
                    <DashboardItem
                        text="Home"
                        logo="i-lucide-home"
                        href="/dashboard"
                    />
                    <DashboardItem
                        text="Tickets"
                        logo="i-lucide-messages-square"
                        href="/tickets"
                    />
                    <DashboardItem
                        text="Organization"
                        logo="i-lucide-user-circle-2"
                        href="/organization"
                    />
                    <DashboardItem
                        text="Settings"
                        logo="i-lucide-settings"
                        href="/settings"
                    />
                    <DashboardItem
                        text="Need Help?"
                        logo="i-lucide-mail-question"
                        href="/help"
                    />
                    <DashboardItem
                        text="Sign Out"
                        logo="i-lucide-log-out"
                        href="/api/auth/signout"
                    />
                </ul>
                <div class="text-2xl font-bold">TICKBETH</div>
            </nav>
            <div class="h-full w-full">{children}</div>
        </div>

    )
}

function DashboardItem({
    text,
    logo,
    href,
    newTab,
}: {
    text: string;
    logo: string;
    href: string;
    newTab: boolean;
}) {
    return (
        <li>
            <a
                class="flex items-center gap-3 py-2 text-2xl font-light hover:underline"
                href={href}
                target={newTab ? "_blank" : ""}
            >
                <div class={logo} />
                <span>{text}</span>
            </a>
        </li>
    )
}
