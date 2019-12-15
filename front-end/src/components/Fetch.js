function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
  
    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));
  
    if (xsrfCookies.length === 0) {
      return null;
    }
  
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }

export function submitPost(studentInfo, records, fileName) {

    const rows = records.map((record) => {
        
        const columns = record.columns.map((column, i)=> {
            const col = {
                name: column.name,
                value: column.value,
                type: column.type,
                index: i
            }

            return col;
        });

        const row = {
            columns: columns
        }

        return row;
    });

    const body = {
        studentInfo: studentInfo,
        records: rows,
        fileName: fileName
    }

    let response = fetch("http://localhost:9000/record-book/submit",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

/*     let result = response.json();
    alert(result.message()); */
}

export async function submitHugeData(studentInfo, records) {

    const rows = records.map((record) => {
        
        const columns = record.columns.map((column, i)=> {
            const col = {
                name: column.name,
                value: column.value,
                type: column.type,
                index: i
            }

            return col;
        });

        const row = {
            columns: columns
        }

        return row;
    });

    const body = {
        studentInfo: studentInfo,
        records: rows
    }

    let response = await fetch("http://localhost:9000/record-book/submit/huge-data",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    let json = await response.json();
    alert(json.message);

/*     let result = response.json();
    alert(result.message()); */
}