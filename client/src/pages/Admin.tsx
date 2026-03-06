import { useState } from "react";
import { useDealRequests, useUpdateDealRequest } from "@/hooks/use-deal-requests";
import { useVehicleRequests, useUpdateVehicleRequest } from "@/hooks/use-vehicle-requests";
import { useContactMessages, useUpdateContactMessage } from "@/hooks/use-contact-messages";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"deals" | "vehicles" | "messages">("deals");
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
              Admin Control Panel
            </h1>
            <p className="text-muted-foreground mt-1">Manage user requests and updates.</p>
          </div>
          <div className="flex bg-white dark:bg-slate-900 rounded-xl p-1 shadow-sm border border-border">
            {(["deals", "vehicles", "messages"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-sm overflow-hidden">
          {activeTab === "deals" && <AdminDeals />}
          {activeTab === "vehicles" && <AdminVehicles />}
          {activeTab === "messages" && <AdminMessages />}
        </div>
      </div>
    </div>
  );
}

function AdminDeals() {
  const { data: deals, isLoading } = useDealRequests();
  const updateMutation = useUpdateDealRequest();
  const { toast } = useToast();
  
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [score, setScore] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleReview = () => {
    if (!selectedDeal) return;
    updateMutation.mutate({
      id: selectedDeal.id,
      status: "reviewed",
      score: parseInt(score),
      recommendation
    }, {
      onSuccess: () => {
        toast({ title: "Deal updated successfully" });
        setSelectedDeal(null);
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center text-muted-foreground">Loading deals...</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-50/50 dark:bg-slate-800/50 text-sm">
              <th className="p-4 font-medium text-muted-foreground">ID</th>
              <th className="p-4 font-medium text-muted-foreground">Vehicle</th>
              <th className="p-4 font-medium text-muted-foreground">Price</th>
              <th className="p-4 font-medium text-muted-foreground">Status</th>
              <th className="p-4 font-medium text-muted-foreground">Score</th>
              <th className="p-4 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {deals?.map(deal => (
              <tr key={deal.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4 text-sm font-medium">#{deal.id}</td>
                <td className="p-4 text-sm">{deal.year} {deal.make} {deal.model}</td>
                <td className="p-4 text-sm">${deal.price.toLocaleString()}</td>
                <td className="p-4">
                  <Badge variant={deal.status === 'pending' ? 'secondary' : 'default'} className="capitalize">{deal.status || 'pending'}</Badge>
                </td>
                <td className="p-4 text-sm">{deal.score || '-'}</td>
                <td className="p-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedDeal(deal);
                      setScore(deal.score?.toString() || "");
                      setRecommendation(deal.recommendation || "");
                    }}
                  >
                    Review
                  </Button>
                </td>
              </tr>
            ))}
            {deals?.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No deals found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedDeal} onOpenChange={(open) => !open && setSelectedDeal(null)}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border border-border">
          <DialogHeader>
            <DialogTitle>Review Deal #{selectedDeal?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
              <strong>URL:</strong> {selectedDeal?.url ? <a href={selectedDeal.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{selectedDeal.url}</a> : 'None provided'}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Deal Score (0-100)</label>
              <Input type="number" value={score} onChange={(e) => setScore(e.target.value)} placeholder="85" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Recommendation</label>
              <Textarea 
                value={recommendation} 
                onChange={(e) => setRecommendation(e.target.value)} 
                placeholder="Great deal, target price is..."
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleReview} disabled={updateMutation.isPending} className="w-full">
              {updateMutation.isPending ? "Saving..." : "Save Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AdminVehicles() {
  const { data: requests, isLoading } = useVehicleRequests();
  const updateMutation = useUpdateVehicleRequest();
  const { toast } = useToast();

  const handleStatusUpdate = (id: number, status: string) => {
    updateMutation.mutate({ id, status }, {
      onSuccess: () => toast({ title: "Status updated" })
    });
  };

  if (isLoading) return <div className="p-10 text-center text-muted-foreground">Loading requests...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-slate-50/50 dark:bg-slate-800/50 text-sm">
            <th className="p-4 font-medium text-muted-foreground">ID</th>
            <th className="p-4 font-medium text-muted-foreground">Requested Vehicle</th>
            <th className="p-4 font-medium text-muted-foreground">Budget</th>
            <th className="p-4 font-medium text-muted-foreground">Location</th>
            <th className="p-4 font-medium text-muted-foreground">Status</th>
            <th className="p-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {requests?.map(req => (
            <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="p-4 text-sm font-medium">#{req.id}</td>
              <td className="p-4 text-sm">{req.preferredMakeModel}</td>
              <td className="p-4 text-sm">{req.budgetRange}</td>
              <td className="p-4 text-sm">{req.location}</td>
              <td className="p-4">
                <Badge variant={req.status === 'pending' ? 'secondary' : 'default'} className="capitalize">{req.status || 'pending'}</Badge>
              </td>
              <td className="p-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(req.id, 'sourcing')} disabled={req.status === 'sourcing'}>Source</Button>
                <Button size="sm" variant="default" onClick={() => handleStatusUpdate(req.id, 'found')} disabled={req.status === 'found'}>Mark Found</Button>
              </td>
            </tr>
          ))}
          {requests?.length === 0 && (
            <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No vehicle requests found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function AdminMessages() {
  const { data: messages, isLoading } = useContactMessages();
  const updateMutation = useUpdateContactMessage();
  const { toast } = useToast();

  const markRead = (id: number) => {
    updateMutation.mutate({ id, status: "read" }, {
      onSuccess: () => toast({ title: "Marked as read" })
    });
  };

  if (isLoading) return <div className="p-10 text-center text-muted-foreground">Loading messages...</div>;

  return (
    <div className="p-6 grid grid-cols-1 gap-4">
      {messages?.map(msg => (
        <div key={msg.id} className={`p-4 rounded-xl border ${msg.status === 'new' ? 'bg-primary/5 border-primary/20' : 'bg-white dark:bg-slate-800 border-border'}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold text-foreground">{msg.subject}</h4>
              <p className="text-sm text-muted-foreground">{msg.name} ({msg.email}) {msg.phone && `• ${msg.phone}`}</p>
            </div>
            {msg.status === 'new' && (
              <Button size="sm" onClick={() => markRead(msg.id)}>Mark Read</Button>
            )}
          </div>
          <p className="text-slate-700 dark:text-slate-300 text-sm mt-2 whitespace-pre-wrap">{msg.message}</p>
        </div>
      ))}
      {messages?.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">No contact messages.</div>
      )}
    </div>
  );
}
