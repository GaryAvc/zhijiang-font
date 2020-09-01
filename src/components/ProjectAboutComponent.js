import React from 'react';
import { Breadcrumb, BreadcrumbItem, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

// todo - Start to modify the code to updated to ip server
// {"createTime":"20200818","name":"软件","updateTime":"20200919","url":"https://www.sojson.com"}
function RenderDownloads({ download }) {
	return (
		<tr>
			<th scope="row">{download.name}</th>
			<td>{download.createTime}</td>
			<td>{download.updateTime}</td>
			<td>{download.url}</td>
		</tr>
	);
}

const Downloading = (props) => {
	const singleDownload = props.downloads.downloads.map((download) => {
		return <RenderDownloads download={download} />;
	});

	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem>
						<Link to="/">主页</Link>
					</BreadcrumbItem>
					<BreadcrumbItem active>下载汇总</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>下载汇总</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<Table>
					<thead>
						<th>名称</th>
						<th>创建时间</th>
						<th>更新时间</th>
						<th>下载地址</th>
					</thead>
					<tbody>{singleDownload}</tbody>
				</Table>
			</div>
		</div>
	);
};

export default Downloading;
