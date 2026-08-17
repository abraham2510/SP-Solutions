import { requireAdmin } from "@/lib/auth-helpers";
import {
  getDashboardStats,
  type DashboardRecentEnquiry,
  type DashboardRecentProduct,
} from "@/lib/data/admin";
import Link from "next/link";
import {
  Package,
  CheckCircle2,
  Tag,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireAdmin();
  const stats = await getDashboardStats();

  const metrics = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      description: "All catalogue machines",
      icon: Package,
      iconBg: "bg-blue-50 text-[#00266A]",
    },
    {
      label: "Active Products",
      value: stats.activeProducts,
      description: "Live on public website",
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      description: "Machine categories",
      icon: Tag,
      iconBg: "bg-amber-50 text-amber-700",
    },
    {
      label: "New Enquiries",
      value: stats.newEnquiries,
      description: stats.newEnquiries > 0 ? "Requires attention" : "All leads caught up",
      icon: MessageSquare,
      iconBg: stats.newEnquiries > 0 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-600",
      urgent: stats.newEnquiries > 0,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, {user.name || "Admin"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your SP Solutions industrial machinery catalogue and customer enquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button render={<Link href="/admin/products/new" />} variant="outline" size="sm" className="gap-1.5 border-slate-200 text-slate-700 hover:bg-slate-50">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <Button render={<Link href="/admin/enquiries" />} size="sm" className="gap-1.5 bg-[#00266A] hover:bg-[#001D52] !text-white">
            <MessageSquare className="h-4 w-4" />
            View Enquiries
          </Button>
        </div>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card
            key={m.label}
            className={`border-slate-200 bg-white transition-all hover:shadow-sm ${
              m.urgent ? "border-rose-300 ring-1 ring-rose-100" : ""
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {m.label}
              </CardTitle>
              <div className={`p-2.5 rounded-xl ${m.iconBg}`}>
                <m.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900 tracking-tight">{m.value}</div>
              <p className="text-xs text-slate-500 mt-1">
                {m.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid: Recent Products & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card className="flex flex-col border-slate-200 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Recent Products
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Latest catalogue machinery added or updated
              </CardDescription>
            </div>
            <Button render={<Link href="/admin/products" />} variant="ghost" size="sm" className="gap-1 text-xs text-[#00266A] hover:text-[#001D52] hover:bg-slate-100">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-slate-100">
              {stats.recentProducts.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-400">
                  No products added yet.
                </div>
              ) : (
                stats.recentProducts.map((p: DashboardRecentProduct) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="h-10 w-10 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-400 shrink-0">
                          <Package className="h-5 w-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="text-sm font-semibold text-slate-900 hover:text-[#00266A] transition-colors truncate block"
                        >
                          {p.name}
                        </Link>
                        <p className="text-xs text-slate-500 truncate">
                          {p.category?.name || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={p.status} className="ml-2 shrink-0" />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Customer Enquiries */}
        <Card className="flex flex-col border-slate-200 bg-white shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">
                Recent Customer Enquiries
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Latest incoming buyer leads & service requests
              </CardDescription>
            </div>
            <Button render={<Link href="/admin/enquiries" />} variant="ghost" size="sm" className="gap-1 text-xs text-[#00266A] hover:text-[#001D52] hover:bg-slate-100">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-slate-100">
              {stats.recentEnquiries.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-400">
                  No customer enquiries received yet.
                </div>
              ) : (
                stats.recentEnquiries.map((e: DashboardRecentEnquiry) => (
                  <Link
                    key={e.id}
                    href={`/admin/enquiries/${e.id}`}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00266A]/10 text-[#00266A] font-bold text-xs shrink-0">
                        {e.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {e.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(e.createdAt).toLocaleDateString("en-IN")}
                          </span>
                          {e.company && (
                            <>
                              <span>•</span>
                              <span className="truncate">{e.company}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={e.status} className="ml-2 shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
