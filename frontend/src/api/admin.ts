// Admin API — summary/insights data for the Admin Insights page
import apiClient from "./client";

export interface PerformerAsset {
	symbol: string;
	name: string;
	value: number;
	changePercent: number;
	icon: string;
	miniChart: number[];
}

export interface ClosestGoal {
	id: number;
	name: string;
	progressPct: number;
	currentAmount: number;
	targetAmount: number;
	color: string;
}

export interface AllocationItem {
	symbol: string;
	name: string;
	value: number;
	percentage: number;
}

export interface AdminSummaryResponse {
	totalPortfolioValue: number;
	totalGainLoss: number;
	totalAssets: number;
	totalTransactions: number;
	averageReturn: number;
	topPerformer: PerformerAsset;
	worstPerformer: PerformerAsset;
	highestValueAsset: PerformerAsset;
	closestGoal: ClosestGoal;
	allocationPie: AllocationItem[];
}

export async function fetchAdminSummary(): Promise<AdminSummaryResponse> {
	const { data } = await apiClient.get<AdminSummaryResponse>(
		"/admin/summary"
	);
	return data;
}
