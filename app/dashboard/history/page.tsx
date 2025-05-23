"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, ArrowUpRight, ArrowDownRight, DollarSign, Clock, LogOut, Filter, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function History() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(storedUser))
    } catch (error) {
      localStorage.removeItem("user")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1735] text-white hidden md:block">
        <div className="p-4 border-b border-[#253256]">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-contain" />
            </div>
            <span className="ml-2 font-medium text-sm">MXTM INVESTMENT</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/deposit"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Deposit
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/withdraw"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Withdraw
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/investments"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Investments
              </Link>
            </li>
            <li>
              <Link href="/dashboard/history" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                <Clock className="mr-2 h-5 w-5" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/support"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Support
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white w-full text-left"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="bg-[#0a1735] p-4 flex justify-between items-center md:hidden">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="MXTM Investment" fill className="object-contain" />
            </div>
          </Link>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Transaction History</h1>
            <p className="text-gray-400">View all your transaction records</p>
          </div>

          <Card className="bg-[#0a1735] border-[#253256] text-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Transactions</CardTitle>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="bg-[#162040] border-[#253256]">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#0a1735]">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="deposits" className="data-[state=active]:bg-[#0a1735]">
                    Deposits
                  </TabsTrigger>
                  <TabsTrigger value="withdrawals" className="data-[state=active]:bg-[#0a1735]">
                    Withdrawals
                  </TabsTrigger>
                  <TabsTrigger value="investments" className="data-[state=active]:bg-[#0a1735]">
                    Investments
                  </TabsTrigger>
                  <TabsTrigger value="earnings" className="data-[state=active]:bg-[#0a1735]">
                    Earnings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No transactions found</p>
                    <p className="text-sm text-gray-500 mt-2">Make your first deposit to start investing</p>
                    <Button className="mt-4 bg-[#0066ff] hover:bg-[#0066ff]/90">
                      <Link href="/dashboard/deposit">Deposit Now</Link>
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="deposits" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No deposits found</p>
                  </div>
                </TabsContent>

                <TabsContent value="withdrawals" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No withdrawals found</p>
                  </div>
                </TabsContent>

                <TabsContent value="investments" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No investments found</p>
                  </div>
                </TabsContent>

                <TabsContent value="earnings" className="mt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-400">No earnings found</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
