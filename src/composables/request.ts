export const useRequest = () => {
	const response = ref<any>(null);
	const iserror = ref<any>(null);
	const isloading = ref<boolean>(false);
	const lastResponseTime = ref<Date>();
	const request = async (url: string, options: RequestInit) => {
		const { data, error, isFetching } = await useFetch(url, options, {
			refetch: true,
		}).json();
		response.value = unref(data);
		iserror.value = unref(error);
		isloading.value = unref(isFetching.value);
		lastResponseTime.value = new Date();
	};
	return {
		response,
		iserror,
		isloading,
		request,
		lastResponseTime,
	};
};
