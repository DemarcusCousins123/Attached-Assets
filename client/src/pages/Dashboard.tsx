import { useDealRequests } from "@/hooks/use-deal-requests";
import { useVehicleRequests } from "@/hooks/use-vehicle-requests";
import { FileText, Car, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: deals, isLoading: dealsLoading } = useDealRequests();
  const { data: vehicles, isLoading: vehiclesLoading } = useVehicleRequests();

  const getStatusColor = (status: string | null) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'reviewed': return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch(status?.toLowerCase()) {
      case 'pending': return <Clock className="h-3 w-3 mr-1" />;
      case 'reviewed': return <CheckCircle2 className="h-3 w-3 mr-1" />;
      case 'rejected': return <AlertCircle className="h-3 w-3 mr-1" />;
      default: return <Clock className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            Client Portal
          </h1>
          <p className="text-muted-foreground mt-2">Track the status of your analyses and sourcing requests.</p>
        </div>

        <div className="space-y-12">
          {/* Deal Requests Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Deal Analysis Requests</h2>
            </div>

            {dealsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-2xl" />)}
              </div>
            ) : deals && deals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map(deal => (
                  <div key={deal.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{deal.year} {deal.make} {deal.model}</h3>
                        <p className="text-sm text-muted-foreground">${deal.price.toLocaleString()} • {deal.mileage.toLocaleString()} mi</p>
                      </div>
                      <Badge variant="outline" className={`flex items-center capitalize ${getStatusColor(deal.status)}`}>
                        {getStatusIcon(deal.status)} {deal.status || 'Pending'}
                      </Badge>
                    </div>
                    
                    {deal.status === 'reviewed' && deal.score && (
                      <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-border">
                        <div className="flex items-end justify-between mb-2">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Deal Score</span>
                          <span className={`text-xl font-bold ${deal.score > 75 ? 'text-green-500' : deal.score > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {deal.score}/100
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                          {deal.recommendation || 'Recommendation pending.'}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-border border-dashed">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No Deal Requests</h3>
                <p className="text-muted-foreground mt-1">Submit a deal from the homepage to get started.</p>
              </div>
            )}
          </section>

          {/* Vehicle Requests Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Vehicle Sourcing Requests</h2>
            </div>

            {vehiclesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2].map(i => <Skeleton key={i} className="h-40 w-full rounded-2xl" />)}
              </div>
            ) : vehicles && vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(req => (
                  <div key={req.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{req.preferredMakeModel}</h3>
                        <p className="text-sm text-muted-foreground">Budget: {req.budgetRange}</p>
                      </div>
                      <Badge variant="outline" className={`flex items-center capitalize ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)} {req.status || 'Pending'}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-2 space-y-1">
                      <p><strong>Type:</strong> {req.vehicleType}</p>
                      <p><strong>Years:</strong> {req.yearRange}</p>
                      <p><strong>Location:</strong> {req.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-border border-dashed">
                <Car className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground">No Sourcing Requests</h3>
                <p className="text-muted-foreground mt-1">Looking for a specific car? Let us find it for you.</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
