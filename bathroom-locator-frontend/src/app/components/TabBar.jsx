export default function TabBar({ id, title, activeTab, handleTabChange }) {
	return (
		<div>
			<li className="me-2" role="presentation">
				<button className={`${activeTab === id ? "text-blue-500 border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} inline-block p-4 border-b-2 rounded-t-lg`} type="button" role="tab" onClick={() => handleTabChange(id)}>{title}</button>
			</li>
		</div>
	)
}